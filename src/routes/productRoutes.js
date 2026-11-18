import express from "express"
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js'

const router = express.Router();


// Al montarse en api/products, "/" corresponde a /api/products y "/:id" captura el identificador enviado en la url
router.get("/", getAllProducts);
router.get("/:", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;