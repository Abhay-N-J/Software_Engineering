const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("User", UserModel, "Users");