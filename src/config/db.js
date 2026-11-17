const mongoose = require("mongoose");

// Abre la conexion compartida de mongoose con MongoDB Atlas
const connectDB = async () => {
  try {
    // Evitamos abrir otra conexion si Mongoose ya esta conectando o conectado
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    // MONGODB_URI se obtiene del entorno .env bien de local o del vercel cuando hagamos deploy
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Atlas conectando en: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error de conexion a MongoDB: ${error.message}`);

    // Sin base de datos la API no puede atender
    process.exit(1);
  }
};

module.exports = connectDB;
