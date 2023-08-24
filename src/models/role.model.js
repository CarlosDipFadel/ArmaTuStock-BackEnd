import mongoose from 'mongoose';
const { Schema } = mongoose; 

const roleShema = new Schema({
    role: String,
    usuarios: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}]
}, {versionKey: false});

const RoleModel = mongoose.model("role", roleShema); // crea la coleccion en la base de datos

module.exports = RoleModel;