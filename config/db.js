import "dotenv/config";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongo DB");
  } catch (error) {
    console.error("Error connecting to mongodb", error);
    process.exit(1);
  }
};
