import mongoose from "mongoose";

const connectDB = async () => {
  try {
      
    const conn = await mongoose.connect(process.env.DATABASE_URI, {
    //   useNewUrlParser: true,
    });
    console.log(`MongoDB Connected:, DB: ${conn.connection.name}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
export default connectDB;