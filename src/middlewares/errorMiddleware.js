const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        error: "Ruta no encontrada (404)",
        message: `No existe el endpoint ${req.method} ${req.originalUrl}`,
    });
};

const errorHandler = (req, res, next) => {


    let statusCode = err.statusCode || 500;
    let message = err.message || "Error interno del servidor"


    if (err.name === "ValidatorError"){
        statusCode = 400;
        message = `Formato de id invalido: ${err.value}`
    }


    if(err.name === "ValidationErorr"){
        statusCode = 400,
        message = Object.values(err.errors).map((val)=>val.message).join(", ")
    }

    res.status(statusCode).json({
        success: false,
        error: statusCode === 500 ? "Internal Server Error" : "Bad Request"
    })
};


export{notFound, errorHandler}