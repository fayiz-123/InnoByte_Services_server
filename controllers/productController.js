const Product = require('../models/productModel')
const QrCode = require('qrcode')

//allProducts
async function allProducts(req, res) {
    try {
        const allProduct = await Product.find({stock:{$gt:0}})
       return res.status(201).json({ success: true, allProduct })

    } catch (error) {
       return res.status(500).json({ success: false, message: error.message })

    }
}


//getOneProduct
async function getOneProduct(req, res) {
    try {
        const { id } = req.params
        const findProduct = await Product.findById(id)
        if (!id) {
            return res.status(400).json({ success: false, message: "Invalid ID" })
        }
        if (findProduct)
            res.status(200).json({ success: true, findProduct })
        else {
            return res.status(404).json({ success: false, message: "Product not found" })
        }
    } catch (error) {

        return res.status(500).json({ success: false, message: error.message })
    }

}


//addProducts
async function addProducts(req, res) {
    try {
        const { name, description, price, stock } = req.body        
        
        const addProducts = new Product({ name, description, price, stock, image:req.file.path.replace(/^.*[\\/]/, '') })
        const newProducts = await addProducts.save()
        const productUrl = ` localhost:5173/product/${newProducts._id}`
        const qrCodeData = await QrCode.toDataURL(productUrl)
        newProducts.qrCode=qrCodeData
        await newProducts.save()
        res.status(200).json({ success: true, message: "Product Added Successfully", newProducts })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })

    }
}

//updateProduct
async function updateProduct(req, res) {
    try {
        const { id } = req.params
        const { name, description, price, stock } = req.body
       const image = req.file.path.replace(/^.*[\\/]/, '')
        
        const findProd = await Product.findById(id)
        if (!findProd) {
            return res.status(400).json({ success: false, message: "Invalid Product ID" })
        }
        if (!name && !description && !price && !stock) {
            return res.status(402).json({ success: false, message: "No updates available" })
        }
        if(!image){
            res.status(400).json({success:false,message:"Image should be needed"})
        }

        if (name) findProd.name = name
        if (description) findProd.description = description
        if (price) findProd.price = price
        if (stock) findProd.stock = stock
        if(image) findProd.image = image

       

        const updatedProduct = await findProd.save()
        res.status(201).json({ success: true, message: "Product Update Succcessfully", updatedProduct })


    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

//deleteProduct
async function deleteProduct(req, res) {
    try {
        const { id } = req.params
        const deleteProd = await Product.findByIdAndDelete(id)

        if (!deleteProd) {
            return res.status(400).json({ success: false, message: "Invalid Id" })
        }
        res.status(200).json({ success: true, message: "Deleted Successfully" })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })

    }


}

module.exports = {
    addProducts,
    allProducts,
    getOneProduct,
    updateProduct,
    deleteProduct
}