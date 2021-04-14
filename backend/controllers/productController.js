import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    : Fetch all products 
// @route   : Get request to /api/products
// @access  : Public route

const getProducts = asyncHandler(async(req, res) =>{
    const products = await Product.find({})
    // throw new Error('New Error')
    res.json(products)
})

// @desc    : Fetch single product
// @route   : Get request to /api/product/:id
// @access  : Public route


const getProductById = asyncHandler(async(req, res) =>{
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    : Delete single product
// @route   : DDELETE request to /api/product/:id
// @access  : Private/Admin


const deleteProduct = asyncHandler(async(req, res) =>{
    const product = await Product.findById(req.params.id)

    if(product){
        await product.remove()
        res.json({message: ' Product was removed'})
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    : Create single product
// @route   : POST request to /api/products
// @access  : Private/Admin


const createProduct = asyncHandler(async(req, res) =>{
    const product = new Product({
        name: 'Sample Name',
        price: 0,
        user:req.user._id,
        image: '/img/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample Category',
        countInStock: 0,
        rating: 0.0,
        numReviews: 0,
        description: 'Sample Text'
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
}


