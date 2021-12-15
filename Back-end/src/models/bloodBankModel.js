const mongoose = require("mongoose");

const bloodBankSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum : ["A","B", "AB", "O"]
        
    },
    subCategory: {
        type: String,
        required: true,
        enum: ["PLUS", "MOINS"]
        
    },
    city :{
        type: String,
        required: true,
        enum: ["Paris", "Marseille", "Dijon", "Nice", "Lille"],

    },
    quantity : {
        type: Number,
        required : true,
        integer: true,
        min:0

    }
});


const BloodBank = mongoose.model("BloodBank", bloodBankSchema);
module.exports = BloodBank;