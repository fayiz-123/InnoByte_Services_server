const express = require ('express')
const orderRoutes = express.Router()
const orderController= require('../controllers/orderController')
const userAuth = require('../middlewares/userAuth')

orderRoutes.post('/placeOrder',userAuth,orderController.placeOrder)
orderRoutes.get('/orderHistory',userAuth,orderController.getOrder)
orderRoutes.get('/getOrder/:id',userAuth,orderController.getOneorder)
orderRoutes.put('/cancelOrder/:id',userAuth,orderController.cancelOrder)

module.exports=orderRoutes;