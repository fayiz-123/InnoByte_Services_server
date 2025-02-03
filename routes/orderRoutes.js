const express = require ('express')
const orderRoutes = express.Router()
const orderController= require('../controllers/orderController')
const userAuth = require('../middlewares/userAuth')

orderRoutes.post('/placeOrder',userAuth,orderController.placeOrder)

module.exports=orderRoutes;