import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    mongoose.connect(process.env.URL);
    console.log("Connected");
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

// export { connectDB };
connectDB();
