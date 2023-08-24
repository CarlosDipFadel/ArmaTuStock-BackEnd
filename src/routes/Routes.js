const express = require("express");
import userController from "../controllers/userController"

const router = express.Router();

router.get("/", (req, res)=>{res.send("Api ArmaTuStock")});
router.post("/login", userController.login);

module.exports = router;