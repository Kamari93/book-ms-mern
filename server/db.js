import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    mongoose.connect(process.env.URL);
    console.log("Connected");
  } catch (err) {
    console.log(`Error: ${err}`);
    console.error("Error connecting to MongoDB:", err);
  }
};

// export { connectDB };
connectDB();
