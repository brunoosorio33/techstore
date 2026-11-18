import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log(
        `MongoDB Atlas conectado: ${mongoose.connection.host}`
    );
};

export default connectDB;
