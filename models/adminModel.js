const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please provide valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true
    }
}, { timestamps: true })


module.exports = mongoose.model('Admin', adminSchema)