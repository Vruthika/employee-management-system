import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("MongoDB URI not defined in .env file");
        }

        await mongoose.connect(uri); // Removed the deprecated options

        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectToDatabase;
