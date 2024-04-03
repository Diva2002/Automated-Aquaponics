const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const fins_fernsModel = mongoose.model("users", UserSchema)
module.exports = fins_fernsModel