// database.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://archie:Q7My61JMZv0XIWjI@cluster0.zxyte8i.mongodb.net/meryenda_store?appName=Cluster0');
        console.log('✅ MongoDB Connected');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    }
};

export default connectDB;