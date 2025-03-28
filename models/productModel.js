const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Product description is needed"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Price cannot be less than 0"]
    },
    stock: {
        type: Number,
        required: [true, "Product stock is required"],
        min: [0, "Stock cannot be less than 0"]
    },
    image:{
        type:String,
        required:[true,"Image is required"]
    },
    qrCode:{
        type:String
    }

}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)