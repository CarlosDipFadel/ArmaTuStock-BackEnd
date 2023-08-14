const express = require("express");
import userController from "../controllers/userController"

const router = express.Router();
router.get("/", (req, res)=>{res.send("Api ArmaTuStock")});

//Roles
router.get("/getRoles", userController.getRoles);
router.post("/createRole", userController.createRole);

//Usuarios
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;