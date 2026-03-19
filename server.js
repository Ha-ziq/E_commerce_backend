import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";
import googleAuthRoutes from './routes/googleAuth.js'  // ← new
import cors from "cors";
import session from "express-session"; // ← new
import passport from "./config/password.js"; // ← new
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());

app.use(express.json());
app.use(
  session({
    // ← new (must be before passport)
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize()); // ← new
app.use(passport.session()); 
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/", productRoutes);
app.use("/api/", cartRoutes);
app.use("/api/", orderRoutes);
app.use('/auth', googleAuthRoutes);  // ← new (note: no /api/ prefix, intentional)

app.listen(PORT, () => console.log(`Server running on port`, PORT));
