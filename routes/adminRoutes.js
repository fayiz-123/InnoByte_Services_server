const express = require('express')
const adminRoutes = express.Router()
const adminController = require('../controllers/adminController')
const adminAuth = require('../middlewares/adminAuth')

adminRoutes.post('/adminRegistration',adminController.adminRegistration)
adminRoutes.post('/adminLogIn',adminController.adminLoggedIn)
adminRoutes.get('/products',adminAuth,adminController.allProducts)


module.exports=adminRoutes;