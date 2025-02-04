const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "UserID is required"]
    },
    totalamount: {
        type: Number,
        required: [true, "Total Amount is required"],
        default: 0,
    },
    status: {
        type: String,
        required: [true, 'Order status is required'],
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },

}, { timestamps: true })
module.exports = mongoose.model('Order', orderSchema)