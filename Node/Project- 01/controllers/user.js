const User = require("../models/user");

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function getUserById(req, res){
    const user = await User.finById(res.params.id)
    if(!user) return res.status(404).json({ status: "Not Found"});
    return res.json(user);
}

module.exports = { handleGetAllUsers, getUserById }