const express = require('express')
const cartRoutes = express.Router()
const cartController = require('../controllers/cartController')
const userAuth = require('../middlewares/userAuth')


cartRoutes.post('/addToCart',userAuth,cartController.addCart)
cartRoutes.put('/updateCart',userAuth,cartController.updateCart)
cartRoutes.delete('/deleteCart',userAuth,cartController.deleteCartProduct)
cartRoutes.get('/cart',userAuth,cartController.getCart)




module.exports=cartRoutes;