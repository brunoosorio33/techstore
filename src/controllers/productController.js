import Product from "../models/Product"
import User from "../models/User"



// Los controladores impleentan cada operacion HTTP y traducen el resultado en un JSON
// Los errores de mongoose se pasan al middleware central mediante next(error)


// Get /api/producs/ - Obtener todos los productos

const getAllProducts = async (req,res, next) => {
    try {
        const products = await Product.find().sort({createdAt: -1});
        res.status(200).json({
        success: true,
        count: products.length,
        data: products
        });

    } catch (error) {
        next(error);
        ∫
    }
}
