const Admin = require('../models/adminModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.adminId);
        
        if (!admin) {
            return res.status(403).json({ message: 'Access Denied! Not an admin' });
        }

        req.admin = admin; 
        next(); 
    
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};


module.exports=verifyAdmin;
