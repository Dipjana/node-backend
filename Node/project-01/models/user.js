const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: { type: String},
    last_name: { type: String},
    email: { type: String},
    gender: { type: String},
    job_title: { type: String}
},
{ timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;