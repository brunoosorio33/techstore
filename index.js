// Cargar el .env al importar este modulo, antes de leer MONGODBURI
import "dotenv/config"
import express from "express"
import cors from "cors"
import connectDB from "./src/config/db.js"
import productRoutes from "./src/routes/productRoutes.js"
import { notFound, errorHandler } from "./src/middlewares/errorMiddleware.js";


// Crear la aplicacion de express; en este archivo se conectan sus pieza principales
const app = express();

// Inicio la conexion a la base de datos usando la configuracion del entorno

connectDB();

// Los middleswares procesan cada peticion antes que llegue a una ruta
// CORS permite solicitudes desde otros origenes y express.json interpreta los cuerpos json.
app.use(cors())
app.use(express.json());

// EndPoint de comprobacion: informa que el servidor is alive.
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API RESTful operativa y conectada a Atlas DB",
        endpoints: {
            products: "/api/products"
        },
    });
});

// Todas las rutas de productos quedan agrupadas bajo el perfil api/products
app.use("api/products", productRoutes);

// Esto se coloca despues de las rutas: primero detectamos endpoints que no existen.
// Luego se centraliza el trataminto de los errores con next(error).
app.use(notFound);
app.use(errorHandler);

// En local o desarrollo, si inician un servidor de HTTP usamos el local con puerto o importamos los dato de vercel.

const PORT = proccess.env.PORT || 3000;
if(process.env.NODE_ENV !== "production"){
    app.listen(PORT, ()=>{
    console.log(`Servidor ejecutandose en ocal host`);
    });
}

export default app;

