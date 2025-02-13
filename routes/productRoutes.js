const express = require('express')
const productRoutes = express.Router()
const productController = require('../controllers/productController')
const verifyAdmin = require('../middlewares/adminAuth')
const upload = require('../middlewares/uploadImage')


productRoutes.get('/allProducts', productController.allProducts)
productRoutes.get('/product/:id', productController.getOneProduct)
productRoutes.post('/addProducts',verifyAdmin,upload.single('image'), productController.addProducts)
productRoutes.put('/updateProduct/:id',verifyAdmin,upload.single('image') ,productController.updateProduct)
productRoutes.delete('/deleteProduct/:id',verifyAdmin, productController.deleteProduct)



module.exports = productRoutes;