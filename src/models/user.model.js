import mongoose from 'mongoose';
const { Schema } = mongoose; 

const userSchema = new Schema({
    nombre: String,
    apellido: String,
    email: String,
    telefono: Number,
    direccion: String,
    codigoPosta: Number,
    userName: String,
    password: String,
    roles: [{type: mongoose.Schema.Types.ObjectId, ref: 'role'}]
}, {versionKey: false});

const UserModel = mongoose.model("user", userSchema); // crea la coleccion en la base de datos

module.exports = UserModel;