const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
        enum : ["Technicien", "Admin"]
    },
    pass: {
        type: String,
        required: true,
        maxlength :12,
        minlength: 6
    }
});


const User = mongoose.model("User", userSchema);
module.exports = User;