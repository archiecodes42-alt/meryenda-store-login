// database.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://archie:ldf0Kf6Mk4mfLy9d@cluster0.zxyte8i.mongodb.net/meryenda_store?appName=Cluster0');
        console.log('✅ MongoDB Connected');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    }
};

export default connectDB;