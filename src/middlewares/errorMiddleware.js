// Middleware 404: se ejecuta si ninguna ruta anterior atendio la peticion
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        error: "Ruta no encontrada (404)",
        message: `No existe el endpoint ${req.method} ${req.originalUrl}`,
    });
};

// Middleware de errores de express: recibe los errores enviados con next(error) y mantiene un formato json comun para las respuestas del error

const errorHandler = (req, res, next) => {

    // si el error no especifica estado, se trata como un fallo interno (500)
    let statusCode = err.statusCode || 500;
    let message = err.message || "Error interno del servidor"


    // Mongoose genera CastError cuando no puede convertir un valor al tipo esperado
    // ejemplo; cuando el parametro id: no tiene formato valido.
    if (err.name === "ValidatorError"){
        statusCode = 400;
        message = `Formato de id invalido: ${err.value}`
    }

    // Validation error agrupa los incumplimientos de los esquemas (require, enum, min, etc).

    if(err.name === "ValidationErorr"){
        statusCode = 400,
        message = Object.values(err.errors).map((val)=>val.message).join(", ")
    }

    res.status(statusCode).json({
        success: false,
        error: statusCode === 500 ? "Internal Server Error" : "Bad Request"
    })
};

// Exportaciones con nombre para poder usarlos en el orden correcto. 
export{notFound, errorHandler}