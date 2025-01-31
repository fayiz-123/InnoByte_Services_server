const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "UserId is required"]
    },
    products: [{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
            required:[true,"Product Id is required"]
        },
        quantity: {
            type: Number,
            min: 1,
            required: [true, "quantity is required"]
        },
    }]

})

module.exports = mongoose.model('Cart', cartSchema)