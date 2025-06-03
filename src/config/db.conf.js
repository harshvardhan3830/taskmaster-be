import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
// db.conf.js - Configuration for MongoDB connection
// Ensure that the environment variable MONGO_URI is set in your .env file
if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in the environment variables');
}

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1); // Exit the process with failure
    }
};
export default connectDB;
