const express = require("express");
import userController from "../controllers/userController"

const router = express.Router();

//GET
router.get("/", (req, res)=>{res.send("Api ArmaTuStock")});
router.get("/getUser", userController.getUser);

module.exports = router;