import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { addToCart } from '../controllers/cartControllers/addToCart.js';
import { getCart } from '../controllers/cartControllers/getCart.js';
import {removeProduct,updateCart} from '../controllers/cartControllers/update-cart.js';
import { validate } from '../middlewares/validate.js';
import { cartSchema,cartRemoveSchema,cartUpdateSchema } from '../validators/cartValidators.js';

const router = express.Router();

router.get('/cart', authMiddleware, validate(cartSchema), getCart);
router.post('/cart', authMiddleware, validate(cartSchema), addToCart);
router.put('/cart', authMiddleware, validate(cartUpdateSchema), updateCart);
router.delete('/cart', authMiddleware, validate(cartRemoveSchema), removeProduct);

export default router;
