// routes/adminRegister.js
import express from "express";
import bcrypt from "bcrypt";
import { Admin } from "../models/Admin.js";
import { verifyAdmin } from "./auth.js"; // protected route middleware

const router = express.Router();

// Public Register new admin route (no verification needed)
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
    });

    await newAdmin.save();
    return res
      .status(201)
      .json({ message: "New admin registered successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error registering admin", error: err });
  }
});

// GET all admins (view-only)
router.get("/all", verifyAdmin, async (req, res) => {
  try {
    const admins = await Admin.find({}, "username"); // Exclude password
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: "Error fetching admins" });
  }
});

export { router as adminRegistration };
