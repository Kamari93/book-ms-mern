import express from "express";
import { Book } from "../models/Book.js";
import dotenv from "dotenv";
import { verifyAdmin } from "./auth.js"; // protected route middleware
import jwt from "jsonwebtoken"; // Ensure this is imported for token verification
import { Student } from "../models/Student.js"; // Import Student model for checking out books
dotenv.config();
const router = express.Router();

router.post("/add", verifyAdmin, async (req, res) => {
  try {
    const { title, author, imageUrl, totalCopies = 1 } = req.body;
    const newBook = new Book({
      title,
      author,
      imageUrl,
      totalCopies,
    });

    await newBook.save();
    return res.json({ added: true });
  } catch (err) {
    res.json({ message: "Error adding book" });
  }
});

router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    return res.json(books);
  } catch (err) {
    return res.json(err);
  }
});

router.get("/book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById({ _id: id });
    return res.json(book);
  } catch (err) {
    return res.json(err);
  }
});

router.put("/book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndUpdate({ _id: id }, req.body);
    return res.json({ updated: true, book });
  } catch (err) {
    return res.json(err);
  }
});

router.delete("/book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndDelete({ _id: id });
    return res.json({ deleted: true, book });
  } catch (err) {
    return res.json(err);
  }
});

// checkout book route
router.post("/checkout/:bookId", async (req, res) => {
  const { bookId } = req.params;
  const token = req.cookies.token;

  try {
    // Verify student token
    const decoded = jwt.verify(token, process.env.Student_Key);
    const student = await Student.findOne({
      username: decoded.username,
    }).populate("checkedOutBooks");

    if (!student) return res.status(404).json({ message: "Student not found" });

    // Check if student has already checked out 3 books
    if (student.checkedOutBooks.length >= 3) {
      return res
        .status(400)
        .json({ message: "You have reached the checkout limit (3 books)" });
    }

    const book = await Book.findById(bookId);
    if (!book || book.totalCopies <= 0) {
      return res.status(400).json({ message: "Book is not available" });
    }

    // Add book to student's checked out list
    student.checkedOutBooks.push(book._id);
    await student.save();

    // Decrement available copies
    book.totalCopies -= 1;
    await book.save();

    res.json({ message: "Book successfully checked out", book });
  } catch (err) {
    res.status(500).json({ message: "Checkout failed", error: err.message });
  }
});

// return book route for admin permissions
router.post("/return/:studentId/:bookId", verifyAdmin, async (req, res) => {
  const { studentId, bookId } = req.params;

  try {
    const student = await Student.findById(studentId);
    const book = await Book.findById(bookId);

    if (!student || !book) {
      return res.status(404).json({ message: "Student or book not found" });
    }

    // Remove book from student's checkedOutBooks
    student.checkedOutBooks = student.checkedOutBooks.filter(
      (id) => id.toString() !== bookId
    );
    await student.save();

    // Increment book copies
    book.totalCopies += 1;
    await book.save();

    res.json({ message: "Book successfully returned" });
  } catch (err) {
    res.status(500).json({ message: "Return failed", error: err.message });
  }
});

// Fetch specific student's checked out books (Admin view)
router.get("/books/:studentId", verifyAdmin, async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await Student.findById(studentId).populate(
      "checkedOutBooks"
    );
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json(student.checkedOutBooks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch books", error: err.message });
  }
});

export { router as bookRouter };
