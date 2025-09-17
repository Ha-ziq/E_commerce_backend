import express from 'express'
import {register} from '../controllers/authControllers/register.js'
import {login,restricted} from '../controllers/authControllers/login.js'
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import {registerSchema,loginSchema} from '../validators/authValidators.js'



const router = express.Router();

router.post("/register",validate(registerSchema) ,register)
router.post("/login",validate(loginSchema),login)
router.get("/restricted",authMiddleware, restricted)
export default router;