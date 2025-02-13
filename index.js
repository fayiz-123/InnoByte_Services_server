const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL)
app.use('/uploads', express.static('uploads'));
const cors = require('cors')
app.use(cors())


const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const cartRoutes = require('./routes/cartRoutes')


app.use('/', userRoutes)
app.use('/admin', adminRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)
app.use('/orders', orderRoutes)



app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
})