const User = require('../models/userModel')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')

//signup
async function signup(req, res) {
    try {
        const { username, password, email, address } = req.body

        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
          return  res.status(400).json({ success: false, message: "Email already exist", })

        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10)
            
            const newUser = new User({
                username: username, email: email, password: hashedPassword, address: {
                    street: address.street,
                    city: address.city,
                    state: address.state,
                    postalCode: address.postalCode,
                    country: address.country
                }
            })
            const savedUser = await newUser.save()
            const token = jwt.sign({
                userID: savedUser._id
            },process.env.JWT_SECRET,{expiresIn:'42h'})
            res.status(201).json({ success: true, message: "Account Created Successfully", savedUser,token })
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}

//login
async function login(req, res) {
    try {
        const { email, password } = req.body
        const existUser = await User.findOne({ email: email })
        if (!existUser) {
            return res.status(400).json({ success: false, message: "User not Found" })
        }
        const isValidPassword = await bcrypt.compare(password, existUser.password)
        if (!isValidPassword) {
            return res.status(400).json({ success: false, message: "Incorrect Password" })
        }
        const token = jwt.sign({
            userID:existUser._id
        },process.env.JWT_SECRET,{expiresIn:'42h'})

        return res.status(200).json({success: true, token })


    } catch (error) {
        res.status(500).json({ success: false, message: error.message })

    }
}

//userProfile
async function userprofile(req, res) {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (user) {
            res.status(200).json({ success: true, message: "Get the user Successfully", user })
        }
        else {
            res.status(404).json({ success: false, message: "User not found" })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })

    }

}
//updatUserProfile
async function updateProfile(req, res) {
    try {
        const { id } = req.params
        
        const { username, address, password } = req.body

        const profile = await User.findById(id)
        if (!profile) {
            return res.status(404).json({ success: false, message: "Invalid User ID" })
        }
        if (!username && !address && !password) {
            return res.status(400).json({ success: false, message: "No updates available" })
        }

        if (username) profile.username = username
        if (address) {
            profile.address = {
                street: address.street || profile.address.street,
                city: address.city || profile.address.city,
                state: address.state || profile.address.state,
                postalCode: address.postalCode || profile.address.postalCode,
                country: address.country || profile.address.country
            }
        }
        const updatedProfile = await profile.save()
        return res.status(200).json({ success: true, message: "Updated Profile Successfully", updatedProfile })


    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }

}



module.exports = {
    signup,
    login,
    userprofile,
    updateProfile
}