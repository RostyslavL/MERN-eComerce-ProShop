import asyncHandler from 'express-async-handler'
import orderModel from '../models/orderModel.js'

// @desc    : Create a new order
// @route   : POST request to /api/orders
// @access  : Private route

const addOrderItems = asyncHandler(async(req, res) =>{
    const {
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice
    } = req.body

    if(orderItems && orderItems.lengtgh === 0){
        res.status(400) // bad request
        throw new Error('No order items')
        return
    }else{
        const order = new Order({
            user: req.user._id,
            orderItems, 
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder) // HTTP 201 Created success status response code 
    }
})

export { addOrderItems }