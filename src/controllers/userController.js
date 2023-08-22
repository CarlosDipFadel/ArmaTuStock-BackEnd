import UserModel from "../models/user.model"
import RoleModel from "../models/role.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { populate } from "dotenv"

//Roles

const getRoles = async (req, res) => {
    try { 
        const RolesDB = await RoleModel.find({}, 'role').exec();
        res.status(200).json(RolesDB);
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message});
    }
}

const createRole = async (req, res) => {
    try {
        const role = req.body;

        const RoleDB = await RoleModel.findOne({role: role.role}).exec();

        if (RoleDB){
            return res.status(200).json("Role registrado");
        }

        const newRole = new RoleModel({role: role.role})
        await newRole.save();
        res.status(200).json(newRole); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//Usuarios

const login = async (req, res) => {
    const user = req.body;

    const userDB = await UserModel.findOne({
        $or: [
            {email: user.user},
            {userName: user.user}
        ],
    }).populate({path: 'roles', select: 'role'}).exec();

    console.log("USUARIO", userDB);

    if(!userDB) {
        return res.status(404).send("El usuario y/o contraseña es incorrectos");
    }

    const match = await bcrypt.compare(user.password, userDB.password)
    
    if (!match) {
        return res.status(401).send("El usuario y/o contraseña es incorrectos");
    }

    const token = jwt.sign(
        {
          id: userDB._id,
          nombre: userDB.nombre,
          apellido: userDB.apellido
        },
        process.env.SECRET_KEY, 
        { expiresIn: "1D" } 
    );

    res.header("auth-token", token).json({
        data: { 
            token,
            userDB
        }
    });
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
            userName: user.userName,
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

const getUser = async (req, res) => {
    try {
        const users = await UserModel.find().populate('roles', 'role'); // Utilizamos populate para traer los roles relacionados
        
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

const updateUser = async (req, res) => {
    try {
        const user = req.body;  
        const userDB = await UserModel.findById({_id: user._id}).exec();
        if(userDB){
            userDB.nombre = user.nombre
            userDB.apellido = user.apellido
            userDB.email = user.email
            userDB.telefono = user.telefono
            userDB.direccion = user.direccion
            userDB.codigoPostal = user.codigoPostal
            userDB.userName = user.userName
            userDB.password = user.password

            await userDB.save();
            res.status(200).json(userDB)
        }else{
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(400).json({ error: "Error en la base de datos" });
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.body.id;  
        await UserModel.findOneAndDelete({_id: id}).exec();
        res.status(200).json("usuario eliminado")
    } catch (error) {
        res.status(400).json({ error: "Usuario no eliminado" });
    }
}

module.exports = {
    getRoles, 
    createRole,
    login,
    register,
    updateUser,
    deleteUser,
    getUser
};