import express from "express";
import { Student } from "../models/Student.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { verifyAdmin } from "./auth.js"; // protected route middleware
import { Book } from "../models/Book.js";
import jwt from "jsonwebtoken"; // Ensure this is imported for token verification
import mongoose from "mongoose";
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

// ✅ Get All Students (Admin Only)
router.get("/students", verifyAdmin, async (req, res) => {
  try {
    const students = await Student.find({}, { password: 0 }); // Exclude password
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch students" });
  }
});

// ✅ Update Student (Admin Only)
router.put("/students/:id", verifyAdmin, async (req, res) => {
  const { username, grade } = req.body;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { username, grade },
      { new: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: "Failed to update student" });
  }
});

// ✅ DELETE a student
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.json({ message: "Student deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error deleting student", error: err });
  }
});

// Route to fetch logged-in student's checked out books
router.get("/my-books", async (req, res) => {
  const token = req.cookies.token;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.Student_Key);
    const student = await Student.findOne({
      username: decoded.username,
    }).populate("checkedOutBooks"); // Populate book details

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student.checkedOutBooks); // Return the books
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch books", error: err.message });
  }
});

// Get books checked out by a specific student (admin use)
router.get("/:studentId/books", verifyAdmin, async (req, res) => {
  const { studentId } = req.params;

  try {
    // Convert string to ObjectId
    const objectId = new mongoose.Types.ObjectId(studentId);

    // Find student and populate checkedOutBooks
    const student = await Student.findById(objectId).populate(
      "checkedOutBooks"
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Send both the username and books
    res.json({
      username: student.username,
      checkedOutBooks: student.checkedOutBooks,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching books", error: err.message });
  }
});

export { router as studentRouter };
