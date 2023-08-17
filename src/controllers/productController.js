import ProductModel from "../models/product.model"
import CategoryModel from "../models/category.model"

//Category

const createCategory = async (req, res) => {
    try {
        const categoria = req.body;
        const NewCategory = new CategoryModel({
            descripcion: categoria.descripcion
        })
        await NewCategory.save();
        res.status(200).json(NewCategory)
    } catch (error) {
        res.status(404).json("error al cargar la contraseña")
    }
}

const getCategories = async (req, res)=>{
    try {
        const categories = await CategoryModel.find({})
        res.status(200).json(categories)
    } catch (error) {
        res.status(400).json("error al obtener las categorias")
    }

}

//Product

const register = async (req, res) =>{ 
    try {
        const Product = req.body;
        const NewProduct = new ProductModel({
            nombre: Product.nombre,
            descripcion: Product.descripcion,
            stock: Product.stock,
            precio: Product.precio
        })

        const categoria = await CategoryModel.findOne({descripcion: Product.categoria}).exec();

        NewProduct.category = categoria

        NewProduct.save()
        
        res.status(200).json(NewProduct);
    } catch (error) {
        res.status(404).json("error al cargar los datos del producto")
    }
}


const getProduct = async (req, res) =>{
    try {
        const Products = await ProductModel.find({})
            .populate({path: 'category', select: 'descripcion'});

        res.status(200).json(Products)
    } catch (error) {
        res.status(400).json("error al obtener los datos de los productos")
    }
}
const getProductByCategory = async (req, res) =>{
    try {
        const category = req.body.category;

        res.status(200).json(Category)
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message)
    }
}

const updateProducto = async (req, res)=>{
    try {
        const Product = req.body;  
        const ProductDB = await ProductModel.findById({_id: Product._id});
    
        if(ProductDB){
            ProductDB.nombre = Product.nombre
            ProductDB.descripcion = Product.descripcion
            ProductDB.stock = Product.stock
            ProductDB.precio = Product.precio

            const catergory = await CategoryModel.findOne({descripcion: Product.categoria})

            ProductDB.category = catergory

            await ProductDB.save();
            res.status(200).json(ProductDB)
        }else{
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(400).json({ error: "Error en la base de datos" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.body.id;  
        await ProductModel.findOneAndDelete({_id: id}).exec();
        res.status(200).json("Producto eliminado")
    } catch (error) {
        res.status(400).json({ error: "Producto no encontrado" });
    }
}

module.exports = {
    register,
    createCategory,
    getCategories,
    getProduct,
    updateProducto,
    deleteProduct,
    getProductByCategory
};