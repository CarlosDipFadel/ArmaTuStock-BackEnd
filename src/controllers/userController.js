import UserModel from "../models/user.model"
import RoleModel from "../models/role.model"
import bcrypt from "bcrypt"
import { json } from "express"


//GET

const getRoles = async (req, res) => {
    try {
        const roles =  req.body.roles; 
        const RolesDB = await RoleModel.find({}).exec();
        res.status(200).json(RolesDB);
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message});
    }
}

//POST

const createRole = async (req, res) => {
    try {
        const role = req.body;
        const newRole = new RoleModel({role: role.role})
        await newRole.save();
        res.status(200).json(newRole); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const register = async (req, res) => {
    try {
        const user = req.body;  

        //Compruebo si existe un usuario guardado con el mismo email
        const userSave = await UserModel.findOne({email: user.email})
        if(userSave){
            return res.status(404).send("email registrado")
        }

        const hash  = await bcrypt.hash(user.password, 10);
        const NewUser = new UserModel({
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            telefono: user.telefono,
            direccion: user.direccion,
            codigoPostal: user.codigoPostal,
            username: user.username,
            password: hash
        })
        
        //Busco los roles para asociale al usuario
        const RolesDB = await RoleModel.find({role: {$in: user.roles}})
        NewUser.roles.push(...RolesDB)
        RolesDB.forEach(role => {
            role.usuarios.push(NewUser)
            role.save();
        });

        await NewUser.save()
        res.status(201).json(NewUser)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
  

module.exports = {
    getRoles, 
    register,
    createRole
};