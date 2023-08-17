const express = require("express");
import productController from "../controllers/productController"

const router = express.Router();


router.post("/register/product", productController.register)
router.post("/register/category", productController.createCategory)
router.put("/updateProduct", productController.updateProducto)
router.delete("/deleteProduct", productController.deleteProduct)
router.get("/getProducts", productController.getProduct)
router.post("/getProductByCategory", productController.getProductByCategory)
router.get("/getCategories", productController.getCategories)


module.exports = router;