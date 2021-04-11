import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

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

    if(orderItems && orderItems.length === 0){
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
        res.status(201).json(createdOrder)
         // HTTP 201 Created success status response code 
    }
})

// @desc    : Create order by ID
// @route   : GET request to /api/orders/:id
// @access  : Private route

const getOrderByID = asyncHandler(async(req, res) =>{
    const order = await Order.findById(req.params.id).populate(
        'user', 
        'name email'
    )

    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc    : Update order to paid
// @route   : GET request to /api/orders/:id/pay
// @access  : Private route

const updateOrderToPaid = asyncHandler(async(req, res) =>{
    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.payer.email_address
        }
        const updatedOrder = await order.save()
        res.json( updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc    : Gte logged in user orders
// @route   : GET request to /api/orders/'myorders'
// @access  : Private route

const getMyOrders = asyncHandler(async(req, res) =>{
    const orders = await Order.find({user: req.user._id})
    res.json(orders)
})

export { 
    addOrderItems,
    getOrderByID,
    updateOrderToPaid ,
    getMyOrders
}
