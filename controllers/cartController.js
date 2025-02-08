const Cart = require('../models/cartModel')


//add to cart
async function addCart(req, res) {
    try {

        const userId = req.user._id
        const { productId } = req.body
        const quantity = req.body.quantity || 1;

        if (!productId || !quantity) {
            return res.status(400).json({ success: false, message: "ProductId and Quantity required" })
        }

        const cart = await Cart.findOne({ userId })
        if (!cart) {
            const newCart = new Cart({
                userId,
                products: [{ productId, quantity }]
            })
            const saveCart = await newCart.save()
            return res.status(200).json({ success: true, message: "Item added to Cart Successfully", saveCart })
        }
        else {
            const existingProductIndex = cart.products.findIndex((item) =>
                item.productId.toString() === productId
            )
            if (existingProductIndex > -1) {
                cart.products[existingProductIndex].quantity += quantity
            }
            else {
                cart.products.push({ productId, quantity })

            }
            const updatedCart = await cart.save()
            return res.status(201).json({ success: true, message: "Item added to Cart successfully", cart: updatedCart })
        }

    } catch (error) {

        return res.status(500).json({ success: false, message: error.message })

    }

}


//quantityUpdation

async function updateCart(req, res) {
    try {

        const userId = req.user._id
        const { productId, action } = req.body
        if(!productId || !action){
          return  res.status(400).json({success:false,message:"productId and action required"})
        }
        const cart = await Cart.findOne({ userId })
        if(!cart){
            return res.status(400).json({success:false,message:"Cart not found"})
        }
        const existProductIndex = cart.products.findIndex((item) => item.productId.toString() === productId)
        if (existProductIndex === -1) {
            return res.status(400).json({ success: false, message: "Product not found in the cart" });
        }

        if (action === 'increment') {
            cart.products[existProductIndex].quantity += 1
        }
        else if (action === 'decrement') {
            cart.products[existProductIndex].quantity -= 1

            if (cart.products[existProductIndex].quantity <= 0) {
                cart.products.splice(existProductIndex, 1)
            }
        }
        else {
            return res.status(403).json({ success: false, message: "Invalid action" })
        }
        const saveNewCart = await cart.save()
        return res.status(200).json({ success: true, cart: saveNewCart })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }

}


//deleteCartProduct

async function deleteCartProduct(req, res) {
    try {
        const userId = req.user._id
        const { productId } = req.body
        const cart = await Cart.findOne({ userId })
        const productIndex = cart.products.findIndex((item) => item.productId.toString() === productId)
        if (productIndex === -1) {
            return res.status(400).json({ success: false, message: "product not found in the cart" })
        }
        cart.products.splice(productIndex, 1)//for deleting product from the cart

        const savedCart = await cart.save()
        return res.status(200).json({ success: true, message: "item removed from the cart Successfully", cart: savedCart })

    } catch (error) {
       return res.status(500).json({ success: false, message: error.message })

    }


}

//cartShowing

async function getCart(req, res) {
    try {
        const userId = req.user._id
        const cart = await Cart.findOne({ userId }).populate('products.productId').populate('userId')
        if (!cart) {
            return res.status(400).json({ success: false, message: "Cart Not found" })
        }
        const shippingAddress= cart.userId.address
       
        
        return res.status(200).json({ success: true, cart ,address:shippingAddress})


    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }

}



module.exports = {
    addCart,
    updateCart,
    deleteCartProduct,
    getCart
}