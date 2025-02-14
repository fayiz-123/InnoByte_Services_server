const Cart = require('../models/cartModel')
const Order = require('../models/ordersModel')
const Product = require('../models/productModel')
const OrderItem = require('../models/orderItemsModel');

//placeOrder

async function placeOrder(req, res) {
    try {
        const userId = req.user._id
        const cart = await Cart.findOne({ userId }).populate('products.productId');

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ success: false, message: "Cart is empty" })
        }
        for (const item of cart.products) {
            if (item.quantity > item.productId.stock) {
                return res.status(400).json({ 
                    success: false, 
                    message: `Insufficient stock for product ${item.productId.name || item.productId._id}` 
                });
            }
        }
        const totalamount = cart.products.reduce((total, item) => {
            return (total + item.quantity * item.productId.price) + 10
        }, 0)
    
        const newOrder = new Order({
            userId: userId,
            totalamount: totalamount,
            status: 'Pending'
        })
        const saveOrder = await newOrder.save()
       
        const orderItems = cart.products.map((item) => ({
            orderId: saveOrder._id,
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price
        }))
        await OrderItem.insertMany(orderItems)
        await Promise.all(
            cart.products.map(async (item) => {
                await Product.findByIdAndUpdate(
                    item.productId._id,
                    { $inc: { stock: -item.quantity } }
                );
            })
        );

        cart.products = []
        await cart.save()



        return res.status(201).json({ success: true, message: "Order Placed Successfully", saveOrder })


    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }

}


//getOrder

async function getOrder(req, res) {
    try {
        const userId = req.user._id
        const orders = await Order.find({ userId }).sort({ createdAt: -1 })
        if (!orders || orders.length === 0) {
            return res.status(400).json({ success: false, message: "Order Not Found", orders: [] })
        }
        const orderswithItems = await Promise.all(orders.map(async (order) => {
            const orderItem = await OrderItem.find({ orderId: order._id }).populate('productId')
            return {
                ...order.toObject(),
                orderItem,
                totalamount: order.totalamount
            }
        }))



        res.status(200).json({ success: true, orderswithItems, })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }

}

//getOneorder

async function getOneorder(req, res) {
    try {
        const { id } = req.params
        const userId = req.user._id

        const getTheOrder = await Order.findOne({ _id: id, userId })
        if (!getTheOrder) {
            return res.status(400).json({ success: false, message: "Order Not Found" })
        }
        const orderAlongItems = await OrderItem.find({ orderId: getTheOrder._id }).populate('productId')

        return res.status(200).json({ success: true, order: { ...getTheOrder.toObject(), orderAlongItems } })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })

    }

}


//cancelOrder

async function cancelOrder(req, res) {
    const userId = req.user._id
    const { id } = req.params

    const order = await Order.findOne({ _id: id, userId })
    if (!order) {
        return res.status(400).json({ success: false, message: "Order Not Found" })
    }
    if (order.status !== 'Pending') {
        return res.status(400).json({ success: false, message: "Order Cannot be cancelled because it is already" + order.status })
    }
    order.status = 'Cancelled'
    const saveOrderStatus = await order.save()

    return res.status(200).json({ success: true, message: "Order Cancelled Successfully", saveOrderStatus })

}



module.exports = {
    placeOrder,
    getOrder,
    getOneorder,
    cancelOrder

}