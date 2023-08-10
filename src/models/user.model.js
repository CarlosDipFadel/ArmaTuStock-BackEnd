import mongoose from 'mongoose';
const { Schema } = mongoose; 

const userSchema = new Schema({
    nombre: String,
    apellido: String,
    direccion: String,
    telefono: Number
}, {versionKey: false});

const UserModel = mongoose.model("user", userSchema); // crea la coleccion en la base de datos

module.exports = UserModel;