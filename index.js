
import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./src/config/db.js";

import productRoutes from "./src/routes/productRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

import {
    notFound,
    errorHandler
} from "./src/middlewares/errorMiddleware.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar MongoDB antes de ejecutar las rutas
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        next(error);
    }
});

// Endpoint principal
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API RESTful operativa y conectada a Atlas DB",
        endpoints: {
            products: "/api/products",
            users: "/api/users"
        }
    });
});

// Rutas de productos y usuarios
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Gestión de errores
app.use(notFound);
app.use(errorHandler);

// Servidor local
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en puerto ${PORT}`);
    });
}

export default app;
