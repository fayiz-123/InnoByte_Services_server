const express = require('express')
const userRoutes = express.Router()
const userController = require('../controllers/userController')

userRoutes.post('/signup', userController.signup)
userRoutes.post('/login', userController.login)
userRoutes.get('/user/:id', userController.userprofile)
userRoutes.put('/updateProfile/:id', userController.updateProfile)


module.exports = userRoutes;