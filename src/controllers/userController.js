import UserModel from "../models/user.model"

const getUser = (req, res) => {
    res.send("Return Usuario")
}

module.exports = {getUser};