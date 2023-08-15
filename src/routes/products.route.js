const express = require("express");
import productController from "../controllers/productController"

const router = express.Router();

//GET
router.get("/getProducts", productController.getProducts);
router.post("/register/product", productController.register)

module.exports = router;