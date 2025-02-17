import express from "express";
import { Student } from "../models/Student.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { verifyAdmin } from "./auth.js"; // protected route middleware
dotenv.config();
const router = express.Router();

router.post("/register", verifyAdmin, async (req, res) => {
  try {
    const { roll, username, password, grade } = req.body;
    const student = await Student.findOne({ username });
    if (student) {
      return res.json({ message: "The student is already registered" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({
      username,
      password: hashPassword,
      roll: roll,
      grade,
    });

    await newStudent.save();
    return res.json({ registered: true });
  } catch (err) {
    res.json({ message: "Error in registering the student" });
  }
});

export { router as studentRouter };
