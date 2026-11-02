import mongoose from "mongoose";

const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        throw new Error("MONGODB_URI is not configured");
    }

    const maxAttempts = 5;
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        try {
            const connectionInstance = await mongoose.connect(mongoUri, {
                serverSelectionTimeoutMS: 8000,
            });
            console.log(`\n MongoDB connected !!!
            ${connectionInstance.connection.host}`);
            return;
        } catch (error) {
            if (attempt === maxAttempts) {
                throw error;
            }

            const delayMs = 1000 * (2 ** (attempt - 1));
            console.error(
                `MongoDB connection attempt ${attempt}/${maxAttempts} failed; retrying in ${delayMs}ms: ${error.message}`
            );
            await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
    }
};

export default connectDB;