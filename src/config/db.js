import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return;
        }

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB Atlas conectado correctamente");
    } catch (error) {
        console.error("Error MongoDB:", error.message);
        throw error;
    }
};

export default connectDB;

