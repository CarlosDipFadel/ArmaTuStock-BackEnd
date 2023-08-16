import ProductModel from "../models/product.model"
import CategoryModel from "../models/category.model"

const getProducts = (req, res) => {
    res.send("Return Product")
}

const createCategory = (req, res) => {
    try {
        const categoria = req.body;
        const NewCategory = new CategoryModel({
            descripcion: categoria.descripcion
        })
        NewCategory.save();
        res.status(200).json(NewCategory)
    } catch (error) {
        res.status(404).json("error al cargar la contraseña")
    }
}

const register = (req, res) =>{ 
    try {
        const Product = req.body;
        const NewProduct = new ProductModel({
            nombre: Product.nombre,
            descripcion: Product.descripcion,
            stock: Product.stock
        })

        NewProduct.save()
        res.status(200).json(NewProduct);
    } catch (error) {
        res.status(404).json("error al cargar los datos del producto")
    }
    

}

module.exports = {
    getProducts,
    register,
    createCategory
};