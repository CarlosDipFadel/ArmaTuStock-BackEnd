import mongoose from 'mongoose';
const { Schema } = mongoose; 

const productSchema = new Schema({
    nombre: String,
    descripcion: String,
    stock: Number,
    category: {type:  mongoose.Schema.Types.ObjectId, ref: 'category'}
}, {versionKey: false});

const ProductModel = mongoose.model("product", productSchema); // crea la coleccion en la base de datos

module.exports = ProductModel;