import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  items: {
    type: [orderItemSchema],
    required: [true, 'Items are required'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Order must contain at least one item'
    }
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount cannot be negative']
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      message: '{VALUE} is not a valid order status'
    },
    default: 'pending'
  },
  orderType: {
    type: String,
    enum: {
      values: ['dine-in', 'take-out'],
      message: '{VALUE} is not a valid order type'
    },
    required: [true, 'Order type is required']
  },
  paymentMethod: {
    type: String,
    enum: {
      values: ['cash', 'gcash'],
      message: '{VALUE} is not a valid payment method'
    },
    required: [true, 'Payment method is required']
  },
  shippingAddress: {
    type: String,
    required: false,
    minlength: [5, 'Shipping address must be at least 5 characters']
  },
  tableNumber: {
    type: Number,
    required: false,
    min: [1, 'Table number must be at least 1'],
    max: [50, 'Table number cannot exceed 50']
  },
  amountPaid: {
    type: Number,
    required: false,
    min: [0, 'Amount paid cannot be negative']
  },
  change: {
    type: Number,
    required: false,
    min: [0, 'Change cannot be negative']
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ orderType: 1 });

const Order = mongoose.model('Order', orderSchema);
export default Order;