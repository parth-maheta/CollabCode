import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(" MONGODB_URI is not defined in .env");
  process.exit(1);
}

function connect() {
  console.log("Connecting to:", MONGODB_URI);
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log(" Connected to MongoDB");
    })
    .catch((err) => {
      console.error(" MongoDB connection error:", err);
    });
}

export default connect;
