const WishList = require('../models/wishListModel')

//addToWishList
async function addToWishList(req, res) {
    try {
        const userId = req.user._id
        const { productId } = req.body
        
        if (!productId) {
            return res.status(400).json({ success: false, message: "No Product Found" })
        }
       
        const userWishList = await WishList.findOne({ userId })
        if (!userWishList) {
            const newWishList = new WishList({ userId, products: [{ productId }] })
            const saveWishList = await newWishList.save()
            const populatewishList = await WishList.findOne({ _id: saveWishList._id }).populate('products.productId')
            return res.status(200).json({ success: true, message: "Added TO WishList SuccessFully", populatewishList })
        }
        else {
            const productExist = userWishList.products.some(item => item.productId.toString() === productId)
            
            if (productExist) {
                return res.status(400).json({ success: false, message: "Product Already Exist" })
            }
            userWishList.products.push({ productId })
            await userWishList.save()
            const updatedWishList = await WishList.findById(userWishList._id).populate('products.productId')
            return res.status(200).json({ success: true, message: "Added TO WishList SuccessFully", updatedWishList })
        }
   
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }

}

//removeFromWishList
async function removeProduct(req, res) {
    try {
        const userId = req.user._id
        const { productId } = req.body
        
        const findWishList = await WishList.findOne({ userId })
        if (!findWishList) {
            return res.status(400).json({ success: false, message: "WisList Not Found For This Account" })
        }
        
        const findProd = findWishList.products.findIndex(prod => prod.productId.toString() === productId)
        if (findProd === -1) {
            return res.status(400).json({ success: false, message: "Product Not Found in The WishList" })
        }
        
        findWishList.products.splice(findProd, 1)
        await findWishList.save()
        
        const removedWishList = await WishList.findById(findWishList._id).populate('products.productId')
        
        return res.status(200).json({ success: true, message: "Product Removed Successfully", removedWishList })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}

//getWishList
async function getWishList(req,res) {
    try {
    const userId = req.user._id
    const getWishList = await WishList.findOne({userId}).populate('products.productId')
    if(!getWishList){
        res.status(400).json({success:false,message:"WishList is Empty"})
    }
    res.status(200).json({success:true,getWishList})
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
    
}

module.exports = {
    addToWishList,
    removeProduct,
    getWishList
}