const mongoose = require('mongoose')


const OrderItemsSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: [true, "ObjectId is required"]
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, "ProductId is required"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: 1
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: 0,
    }

})

module.exports = mongoose.model('OrderItem', OrderItemsSchema)