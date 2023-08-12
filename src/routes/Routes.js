const express = require("express");
import userController from "../controllers/userController"

const router = express.Router();

//GET
router.get("/", (req, res)=>{res.send("Api ArmaTuStock")});

//POST
router.post("/getRoles", userController.getRoles);
router.post("/createRole", userController.createRole);
router.post("/register", userController.register);

module.exports = router;