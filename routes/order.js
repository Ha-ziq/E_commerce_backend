import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { placeOrder } from '../controllers/orderControllers/placeOrder.js';
import { getOrders } from '../controllers/orderControllers/getOrders.js';

const router = express.Router();
router.post('/order', authMiddleware, placeOrder);
router.get('/order',authMiddleware,getOrders)
export default router;
