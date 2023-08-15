import ProductModel from "../models/product.model"

const getProducts = (req, res) => {
    res.send("Return Product")
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
    register
};