const mongoose = require('mongoose')
const wishListSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    products:[{
        productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        }
    }]
},{timestamps:true})

module.exports=mongoose.model('wishList',wishListSchema)