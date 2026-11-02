import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error("MONGODB_URI is not configured");
        }

        const connectionInstance = await mongoose.connect(
            mongoUri,
            { serverSelectionTimeoutMS: 5000 }
        );
        console.log(`\n MongoDB connected !!!
            ${connectionInstance.connection.host}`);

    } catch (error) {
        console.error("MongoDB connection failed", error);
        process.exit(1);

    }
}

export default connectDB;