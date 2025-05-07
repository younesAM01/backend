import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

if (!DB_URI) {
  throw new Error("please set the DB_URI environment variable");
}

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return true;
  }

  try {
    const db = await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to MongoDB");
    return isConnected;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return false;
  }
};

export default connectDB;

