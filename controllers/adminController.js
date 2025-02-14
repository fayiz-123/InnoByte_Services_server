const Admin = require('../models/adminModel')
const Product = require('../models/productModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config


//adminRegistration
async function adminRegistration(req, res) {
    try {
        const { name, email, password } = req.body
        const findAdmin = await Admin.findOne({ email: email })
        if (findAdmin) {
            res.status(400).json({ success: false, message: "This Email is registered Already" })
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const newAdmin = new Admin({ name: name, email: email, password: hashedPassword })
            const saveAdmin = await newAdmin.save()
            const token = jwt.sign({
                adminId: saveAdmin._id
            }, process.env.JWT_SECRET, { expiresIn: '1h' })
            res.status(200).json({ success: true, message: "New Admin Registered SuccessFully", saveAdmin, token })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })

    }

}


//adminLogin
async function adminLoggedIn(req, res) {
    try {
        const { email, password } = req.body
        const checkAdmin = await Admin.findOne({ email: email })
        if (!checkAdmin) {
            return res.status(401).json({ success: false, message: "Admin email is not Correct" })
        }
        const validAdminPassword = await bcrypt.compare(password, checkAdmin.password)
        if (!validAdminPassword) {
            res.status(400).json({ success: false, message: "Password is incorrect" })
        }
        else {
            const token = jwt.sign({
                adminId: checkAdmin._id
            }, process.env.JWT_SECRET, { expiresIn: '1h' })            
            res.status(200).json({ success: true, message: "Admin LoggedIn Successfull", token:token })
           
            
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })

    }

}
//allProducts
async function allProducts(req, res) {
    try {
        const allProduct = await Product.find()
        res.status(201).json({ success: true, allProduct })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })

    }
}


module.exports = {
    adminRegistration,
    adminLoggedIn,
    allProducts
}

