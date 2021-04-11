import express from 'express'
const router = express.Router()
import { 
    addOrderItems,
    getOrderByID,
    updateOrderToPaid,
    getMyOrders 
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderByID)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/myorders').get(protect, getMyOrders)

export default router