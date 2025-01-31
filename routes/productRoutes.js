const express = require('express')
const productRoutes = express.Router()
const productController = require('../controllers/productController')
const verifyAdmin = require('../middlewares/adminAuth')


productRoutes.get('/allProducts', productController.allProducts)
productRoutes.get('/product/:id', productController.getOneProduct)
productRoutes.post('/addProducts',verifyAdmin, productController.addProducts)
productRoutes.put('/updateProduct/:id',verifyAdmin, productController.updateProduct)
productRoutes.delete('/deleteProduct/:id',verifyAdmin, productController.deleteProduct)



module.exports = productRoutes;