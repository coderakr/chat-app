import mongoose from "mongoose";

async function connectDB() {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!process.env.MONGO_URI) {
      console.warn("MONGO_URI not set, using default local MongoDB URI");
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

export default connectDB;
