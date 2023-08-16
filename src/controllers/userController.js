import UserModel from "../models/user.model"
import RoleModel from "../models/role.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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

const login = async (req, res) => {
    const user = req.body;

    const userDB = await UserModel.findOne({
        $or: [
            {email: user.user},
            {userName: user.user}
        ]
    })

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
        error: null,
        data: { token }
    });
}

module.exports = {
    getRoles, 
    createRole,
    register,
    login
};