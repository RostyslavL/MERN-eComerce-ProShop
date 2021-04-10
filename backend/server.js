import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'

import productRouts from './routes/productRouts.js'
import userRouts from './routes/userRouts.js'
import orderRouts from './routes/orderRouts.js'

import {notFound, errorHandler} from './middleware/middleWare.js';

dotenv.config()

connectDB()

const app = express()
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('API is running.........')
})

app.use('/api/products', productRouts)
app.use('/api/users', userRouts)
app.use('/api/orders', orderRouts)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLINET_ID))

app.use(notFound)
app.use(errorHandler)

const  PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is active in ${process.env.NODE_ENV} mode  on port : ${PORT}`.green.bold))