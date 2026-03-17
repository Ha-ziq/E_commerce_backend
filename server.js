import express from 'express'
import connectDB from './db.js'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import productRoutes from "./routes/product.js"
import cartRoutes from "./routes/cart.js"
import orderRoutes from "./routes/order.js"
import cors from 'cors'
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors()); 


app.use(express.json());
connectDB();



app.use('/api/auth', authRoutes);
app.use('/api/',productRoutes);
app.use('/api/',cartRoutes);
app.use('/api/',orderRoutes)








app.listen(PORT, () => console.log(`Server running on port`, PORT));