import express from "express";
import { Book } from "../models/Book.js";
import dotenv from "dotenv";
import { verifyAdmin } from "./auth.js"; // protected route middleware
dotenv.config();
const router = express.Router();

router.post("/add", verifyAdmin, async (req, res) => {
  try {
    const { title, author, imageUrl } = req.body;
    const newBook = new Book({
      title,
      author,
      imageUrl,
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

export { router as bookRouter };
