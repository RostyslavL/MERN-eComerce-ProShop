import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import producrs from './data/products.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res)=>{
    res.send('API is running.........')
})
app.get('/api/products', (req, res)=>{
    res.json(producrs)
})
app.get('/api/products/:id', (req, res)=>{
    const product = producrs.find(p => p._id === req.params.id)
    res.json(product)
})

const  PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is active in ${process.env.NODE_ENV} mode  on port : ${PORT}`.green.bold))