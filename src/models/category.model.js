import mongoose from 'mongoose';
const { Schema } = mongoose; 

const categorySchema = new Schema({
    descripcion: String
}, {versionKey: false});

const CategoryModel = mongoose.model("category", categorySchema); // crea la coleccion en la base de datos

module.exports = CategoryModel;