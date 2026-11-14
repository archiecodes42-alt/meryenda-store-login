import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Try to load bcrypt first (for desktop), fallback to bcryptjs (for mobile)
let bcrypt;
let bcryptType;
try {
    const mod = await import('bcrypt');
    bcrypt = mod.default ?? mod;
    bcryptType = 'bcrypt';
    console.log('✅ Using bcrypt (native) for better performance');
} catch (error) {
    const mod = await import('bcryptjs');
    bcrypt = mod.default ?? mod;
    bcryptType = 'bcryptjs';
    console.log('✅ Using bcryptjs (pure JS) for compatibility');
}

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'meryenda-store-jwt-secret-key';
const MONGODB_URI = process.env.MONGODB_URI;

// Create directories if they don't exist
const viewsDir = path.join(__dirname, 'views');
const publicDir = path.join(__dirname, 'public');
const uploadsDir = path.join(__dirname, 'uploads');
const cssDir = path.join(__dirname, 'css');
const jsDir = path.join(__dirname, 'js');
const imagesDir = path.join(__dirname, 'images');

[viewsDir, publicDir, uploadsDir, cssDir, jsDir, imagesDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`✅ Created directory: ${dir}`);
    }
});

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));

// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL || 'http://localhost:3000'
        : '*',
    credentials: true,
    optionsSuccessStatus: 200
}));

// Body parsing middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Static files
app.use(express.static(publicDir));
app.use('/uploads', express.static(uploadsDir));
app.use('/css', express.static(cssDir));
app.use('/js', express.static(jsDir));
app.use('/images', express.static(imagesDir));

// Session configuration - 365 days
app.use(session({
    secret: process.env.SESSION_SECRET || 'meryenda-store-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'lax'
    },
    name: 'meryenda.sid'
}));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', viewsDir);

// ============== MONGODB SCHEMAS ==============

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'staff', enum: ['admin', 'manager', 'staff', 'cashier'] },
    email: { type: String, sparse: true, lowercase: true, trim: true },
    fullName: { type: String, required: true },
    phoneNumber: String,
    profileImage: String,
    isActive: { type: Boolean, default: true },
    lastLogin: Date,
    refreshToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw new Error('Error hashing password');
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT token - 365 days
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        {
            id: this._id,
            username: this.username,
            role: this.role
        },
        JWT_SECRET,
        { expiresIn: '365d' }
    );
};

// Method to generate refresh token - 365 days
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { id: this._id },
        JWT_SECRET + 'refresh',
        { expiresIn: '365d' }
    );
};

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    description: String,
    imageUrl: String,
    stockQuantity: { type: Number, default: 0, min: 0 },
    lowStockThreshold: { type: Number, default: 5 },
    isAvailable: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    preparationTime: Number,
    calories: Number,
    ingredients: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

// Virtual for checking if low stock
productSchema.virtual('isLowStock').get(function () {
    return this.stockQuantity <= this.lowStockThreshold;
});

const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, unique: true },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        name: String,
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        subtotal: { type: Number, required: true },
        specialInstructions: String
    }],
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['Cash', 'Gcash', 'Credit Card', 'Debit Card'], required: true },
    orderType: { type: String, enum: ['Dine In', 'Take Out', 'Delivery'], required: true },
    tableNumber: { type: Number, min: 1, max: 50 },
    deliveryAddress: {
        street: String,
        barangay: String,
        city: String,
        province: String,
        instructions: String
    },
    customerName: String,
    customerPhone: String,
    amountPaid: { type: Number, required: true },
    change: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'preparing', 'ready', 'completed', 'cancelled', 'refunded'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'refunded', 'failed'],
        default: 'pending'
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    completedAt: Date,
    cancelledAt: Date,
    refundReason: String,
    notes: String,
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

// Generate order number before saving
orderSchema.pre('save', async function () {
    if (!this.orderNumber) {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const count = await mongoose.model('Order').countDocuments({
            createdAt: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        });

        this.orderNumber = `ORD-${year}${month}${day}-${(count + 1).toString().padStart(4, '0')}`;
    }
});

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    imageUrl: String,
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

const inventoryLogSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    action: { type: String, enum: ['add', 'remove', 'adjust', 'sold'], required: true },
    quantity: { type: Number, required: true },
    previousQuantity: Number,
    newQuantity: Number,
    reason: String,
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

// Create models
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);
const Category = mongoose.model('Category', categorySchema);
const InventoryLog = mongoose.model('InventoryLog', inventoryLogSchema);

// ============== DEFAULT USERS ==============

// Create default admin user
const createDefaultAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: 'admin' });

        if (!adminExists) {
            const existingAdmin = await User.findOne({ username: 'admin' });

            if (existingAdmin) {
                if (existingAdmin.role !== 'admin') {
                    existingAdmin.role = 'admin';
                    existingAdmin.fullName = existingAdmin.fullName || 'System Administrator';
                    await existingAdmin.save();
                    console.log('✅ Updated existing user to admin role');
                } else {
                    console.log('✅ Admin user already exists');
                }
                return;
            }

            const adminUser = new User({
                username: 'admin',
                password: 'admin123',
                role: 'admin',
                email: 'admin@meryenda.com',
                fullName: 'System Administrator',
                isActive: true
            });

            await adminUser.save();
            console.log('✅ Default admin user created (username: admin, password: admin123)');
        } else {
            console.log('✅ Admin user already exists');
        }
    } catch (error) {
        if (error.code === 11000) {
            console.log('✅ Admin user already exists (duplicate key)');
        } else {
            console.error('Error creating default admin:', error.message);
        }
    }
};

// Create default staff user
const createDefaultStaff = async () => {
    try {
        const staffExists = await User.findOne({ username: 'staff' });

        if (staffExists) {
            console.log('✅ Staff user already exists');
            return;
        }

        const staffUser = new User({
            username: 'staff',
            password: 'staff123', // hashed automatically by the pre-save hook
            role: 'staff',
            email: 'staff@meryenda.com',
            fullName: 'Store Staff',
            isActive: true
        });

        await staffUser.save();
        console.log('✅ Default staff user created (username: staff, password: staff123)');
    } catch (error) {
        if (error.code === 11000) {
            console.log('✅ Staff user already exists (duplicate key)');
        } else {
            console.error('Error creating default staff:', error.message);
        }
    }
};

// ============== MONGODB CONNECTION ==============

const connectDB = async () => {
    if (!MONGODB_URI) {
        console.error('❌ MONGODB_URI is missing. Add it to your .env file:');
        console.error('   MONGODB_URI=mongodb+srv://archie:Q7My61JMZv0XIWjI@cluster0.zxyte8i.mongodb.net/meryenda_store?appName=Cluster0');
        process.exit(1);
    }

    try {
        console.log('🔄 Attempting to connect to MongoDB Atlas...');

        const conn = await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);

        await createDefaultAdmin();
        await createDefaultStaff();

        return conn;
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        console.log('🔄 Retrying connection in 5 seconds...');
        setTimeout(connectDB, 5000);
    }
};

connectDB();

// ============== AUTH MIDDLEWARE ==============

const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
};

const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.session.role || !roles.includes(req.session.role)) {
            return res.status(403).render('error', {
                message: 'Insufficient permissions',
                error: { status: 403 },
                title: 'Access Denied',
                currentYear: new Date().getFullYear()
            });
        }
        next();
    };
};

// ============== ROUTES ==============

// Home/Dashboard route - serves staffdashboard.ejs
app.get('/', requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId).select('-password -refreshToken').lean();

        res.render('staffdashboard', {
            title: 'Meryenda Store',
            user: user,
            session: req.session,
            currentYear: new Date().getFullYear(),
            error: null
        });
    } catch (error) {
        console.error('Error loading dashboard:', error);
        res.render('staffdashboard', {
            title: 'Meryenda Store',
            user: null,
            session: req.session,
            currentYear: new Date().getFullYear(),
            error: 'Error loading dashboard'
        });
    }
});

// Login page
app.get('/login', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/');
    }
    res.render('login', {
        title: 'Login - Meryenda Store',
        error: null,
        successMessage: null,
        currentYear: new Date().getFullYear()
    });
});

// Login API
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                error: 'Username and password are required'
            });
        }

        const user = await User.findOne({ username, isActive: true });

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        const isMatch = await user.comparePassword(password);

        if (isMatch) {
            req.session.userId = user._id;
            req.session.username = user.username;
            req.session.role = user.role;

            user.lastLogin = Date.now();

            const token = user.generateAuthToken();
            const refreshToken = user.generateRefreshToken();

            user.refreshToken = refreshToken;
            await user.save();

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 365 * 24 * 60 * 60 * 1000
            });

            return res.json({
                success: true,
                message: 'Login successful',
                token,
                refreshToken,
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role,
                    email: user.email,
                    fullName: user.fullName
                }
            });
        }

        res.status(401).json({
            success: false,
            error: 'Invalid credentials'
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: 'An error occurred during login'
        });
    }
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.clearCookie('token');
        res.clearCookie('meryenda.sid');
        res.redirect('/login');
    });
});

// API Routes for Products
app.get('/api/products', async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = { isAvailable: true };

        if (category && category !== 'all') {
            query.category = category;
        }

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const products = await Product.find(query)
            .sort({ category: 1, name: 1 })
            .lean();

        const productsWithFlags = products.map(product => ({
            ...product,
            isLowStock: product.stockQuantity <= product.lowStockThreshold
        }));

        res.json(productsWithFlags);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get all categories
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Category.find({ isActive: true })
            .sort({ displayOrder: 1, name: 1 })
            .lean();
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: error.message });
    }
});

// API Routes for Orders
app.get('/api/orders', requireAuth, async (req, res) => {
    try {
        const { limit = 50, startDate, endDate, status } = req.query;
        let query = {};

        if (startDate && endDate) {
            query.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        if (status) {
            query.status = status;
        }

        const orders = await Order.find(query)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .populate('createdBy', 'username fullName')
            .lean();

        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/orders', requireAuth, async (req, res) => {
    try {
        const orderData = {
            ...req.body,
            createdBy: req.session.userId,
            status: 'pending',
            paymentStatus: req.body.paymentMethod === 'Cash' ? 'paid' : 'pending'
        };

        const order = new Order(orderData);
        await order.save();

        // Update product stock
        for (const item of order.items) {
            const product = await Product.findById(item.productId);
            if (product) {
                const oldStock = product.stockQuantity;
                product.stockQuantity -= item.quantity;
                await product.save();

                await InventoryLog.create({
                    productId: item.productId,
                    action: 'sold',
                    quantity: item.quantity,
                    previousQuantity: oldStock,
                    newQuantity: product.stockQuantity,
                    orderId: order._id,
                    createdBy: req.session.userId
                });
            }
        }

        await order.populate('createdBy', 'username fullName');

        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(400).json({ error: error.message });
    }
});

// Dashboard statistics
app.get('/api/dashboard/stats', requireAuth, async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const [
            totalOrdersToday,
            totalRevenueToday,
            popularProducts,
            categorySales,
            lowStockProducts,
            recentOrders
        ] = await Promise.all([
            Order.countDocuments({
                createdAt: { $gte: today, $lt: tomorrow },
                status: 'completed'
            }),
            Order.aggregate([
                {
                    $match: {
                        createdAt: { $gte: today, $lt: tomorrow },
                        status: 'completed'
                    }
                },
                { $group: { _id: null, total: { $sum: '$total' } } }
            ]),
            Order.aggregate([
                { $match: { status: 'completed' } },
                { $unwind: '$items' },
                {
                    $group: {
                        _id: '$items.productId',
                        name: { $first: '$items.name' },
                        totalSold: { $sum: '$items.quantity' },
                        revenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }
                    }
                },
                { $sort: { totalSold: -1 } },
                { $limit: 5 }
            ]),
            Order.aggregate([
                { $match: { status: 'completed' } },
                { $unwind: '$items' },
                {
                    $group: {
                        _id: '$items.category',
                        totalSales: { $sum: { $multiply: ['$items.quantity', '$items.price'] } },
                        orderCount: { $sum: 1 }
                    }
                }
            ]),
            Product.find({
                $expr: { $lte: ['$stockQuantity', '$lowStockThreshold'] }
            }).select('name stockQuantity lowStockThreshold').limit(10),
            Order.find({ status: 'pending' })
                .sort({ createdAt: -1 })
                .limit(5)
                .populate('createdBy', 'username')
                .lean()
        ]);

        res.json({
            today: {
                orders: totalOrdersToday,
                revenue: totalRevenueToday[0]?.total || 0
            },
            popularProducts,
            categorySales,
            lowStockProducts,
            recentOrders
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ error: error.message });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    const dbState = mongoose.connection.readyState;
    const stateMap = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
    };

    res.json({
        status: 'OK',
        timestamp: new Date(),
        uptime: process.uptime(),
        mongodb: {
            state: stateMap[dbState] || 'unknown',
            code: dbState,
            host: mongoose.connection.host || 'not connected',
            name: mongoose.connection.name || 'not connected'
        },
        bcryptType,
        environment: process.env.NODE_ENV || 'development'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔐 Using ${bcryptType} for password hashing`);
    console.log(`📁 Views directory: ${viewsDir}`);
    console.log(`📁 CSS directory: ${cssDir}`);
    console.log(`📁 JS directory: ${jsDir}`);
    console.log(`📁 Images directory: ${imagesDir}`);
});

export default app;