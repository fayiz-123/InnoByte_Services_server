const express = require('express')
const wishListRoutes = express.Router()
const wishListController = require('../controllers/wishListController')
const userAuth = require('../middlewares/userAuth')

wishListRoutes.post('/addToWishlist',userAuth,wishListController.addToWishList)
wishListRoutes.put('/removeFromWishList',userAuth,wishListController.removeProduct)
wishListRoutes.get('/getWishList',userAuth,wishListController.getWishList)

module.exports=wishListRoutes;