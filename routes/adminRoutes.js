const express = require('express')
const adminRoutes = express.Router()
const adminController = require('../controllers/adminController')

adminRoutes.post('/adminRegistration',adminController.adminRegistration)
adminRoutes.post('/adminLoggedIn',adminController.adminLoggedIn)


module.exports=adminRoutes;