import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
        "mongodb+srv://Venkatesh:7619109684@cluster0.vsjmaj5.mongodb.net/"
    );
    console.log("✅ Connected to Database...");
  } catch (error) {
    console.error("❌ Database Connection Error:", error.message);
  }
};

export default connectDB;
