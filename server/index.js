import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./db.js";
import { AdminRouter } from "./routes/auth.js";
import { studentRouter } from "./routes/student.js";
import { bookRouter } from "./routes/book.js";
import { Book } from "./models/Book.js";
import { Student } from "./models/Student.js";
import { Admin } from "./models/Admin.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: ["https://book-ms-client.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/auth", AdminRouter); // routes
app.use("/student", studentRouter);
app.use("/book", bookRouter);

app.get("/dashboard", async (req, res) => {
  try {
    const books = await Book.countDocuments();
    const students = await Student.countDocuments();
    const admins = await Admin.countDocuments();
    return res.json({ ok: true, books, students, admins });
  } catch (err) {
    // console.log(err);
    return res.json(err);
  }
});

//run server on port 5000
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
