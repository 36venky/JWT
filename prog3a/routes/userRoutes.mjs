import express from "express";
import usermodel from "../models/usermodel.mjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// ✅ Use POST for login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await usermodel.findOne({ username }); // fixed method name
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // simple password check (for demo only — use bcrypt in real apps)
    if (user.password === password) {
      const token = jwt.sign(
        { id: user._id, username: user.username },
        "kishor",
        { expiresIn: "10m" }
      );

      console.log("Generated token:", token);
      return res.json({ token });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// ✅ Register Route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new usermodel({ username, email, password });
    await newUser.save(); // ✅ save to DB

    return res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
