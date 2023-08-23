const express = require("express");
import userController from "../controllers/userController"

const router = express.Router();

//Roles
router.post("/createRole", userController.createRole);
router.get("/getRoles", userController.getRoles);

//Usuarios
router.post("/register", userController.register);
router.post("/update", userController.updateUser);
router.delete("/delete", userController.deleteUser);

router.get("/getUsers", userController.getUser);

module.exports = router;