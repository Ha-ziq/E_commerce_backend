import express from 'express';
import {
  getProductById,
  getProducts,
} from '../controllers/productControllers/getProducts.js';
import { createProducts } from '../controllers/productControllers/createProducts.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import { editProducts } from '../controllers/productControllers/editProduct.js';
import { deleteProduct } from '../controllers/productControllers/deleteProduct.js';
import { productSchema } from '../validators/productValidators.js';
import { validate } from '../middlewares/validate.js';
 
const router = express.Router();

router.get('/products', validate(productSchema), getProducts);
router.get('/products/:id', validate(productSchema), getProductById);
router.post(
  '/products',
  authMiddleware,
  isAdmin,
  validate(productSchema),
  createProducts
);
router.put(
  '/products/:id',
  authMiddleware,
  isAdmin,
  validate(productSchema),
  editProducts
);
router.delete('/products/:id', validate(productSchema), deleteProduct);
export default router;
