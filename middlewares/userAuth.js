const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userID);
        
        if (!user) {
            return res.status(403).json({ message: 'Access Denied! Not a User' });
        }

        req.user = user; 
        next(); 
    
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};


module.exports=verifyUser;
