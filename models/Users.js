  import mongoose from "mongoose";

  const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: false // ← new: not required for Google-auth users
    },
    googleId: {
    type: String,    // ← new: stores Google's unique user ID
    default: null
  },
  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local" // ← new: tracks how the user signed up
  },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 }
      }
    ]
  }, { timestamps: true });

  export default mongoose.model("User", userSchema);
