
import express from 'express'
const router = express.Router()
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    : Fetch all products 
// @route   : Get request to /api/products
// @access  : Public route


router.get(
    '/', 
    asyncHandler( async (req, res) =>{
    const products = await Product.find({})
    res.json(products)
}))

// @desc    : Fetch single product
// @route   : Get request to /api/product/:id
// @access  : Public route

router.get(
    '/:id',  
    asyncHandler( async (req, res) =>{
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
}))

export default router