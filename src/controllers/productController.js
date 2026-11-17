
import Product from "../models/Product.js";
import User from "../models/User.js";

// GET /api/products
// Obtener todos los productos

const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });

    } catch (error) {
        next(error);
    }
};

// GET /api/products/:id busca un producto por su idenificador
// detalle de un producto

const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado con ese ID"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {
        next(error);
    }
};

// POST / api / products crea un producto con os datos enviados en el cuerpo de JSON.

const createProduct = async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product creado con éxito",
            data: newProduct
        });

    } catch (error) {
        next(error);
    }
};

// PUT api /product/:id actualiza los campos enviados y devuelve el documento nuevo.

const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidator: true}
            // Devuelve el objeto actualizado y runValidator aplica validaciones al esquema.
        )
        if(!updatedProduct){
            return res.status(404).json ({
                success: false,
                message: "No se actualizar: Producto no encontrado",
            })
        }
        res.status(200).json({
            success: true,
            message: "Producto acutalizado correctamente",
            data: updatedProduct
        })
    } catch (error) {
        next(error);
    }
};

// DELETE api/produts:id elimina el producto y devuele el documento eliminado.

const deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if(!deletedProduct){
            return res.status(404).json({
            success: false,
            message: "No se pudo eliminar: Producto no encontrado"
            })
        }

        res.status(200).json({
            success: true,
            message: "Producto eliminado correctamente",
            data: deletedProduct,
        });
    } catch (error) {
        
    }
};


// Exportaciones con nombre: el router importa explicitamente cada controlador que utiliza.

export {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
