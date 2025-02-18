import express from "express";
import { Admin } from "../models/Admin.js";
import { Student } from "../models/Student.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

// routes
router.post("/login", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (role === "admin") {
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.json({ message: "Admin not found" });
      }
      const validPassword = await bcrypt.compare(password, admin.password);
      if (!validPassword) {
        return res.json({ message: "Invalid password" });
      }
      const token = jwt.sign(
        { username: admin.username, role: "admin" },
        process.env.Admin_Key
      );
      res.cookie("token", token, { httpOnly: true, secure: true });
      // res.cookie("token", token);
      return res.json({ login: true, role: "admin" });
    } else if (role === "student") {
      const student = await Student.findOne({ username });
      if (!student) {
        return res.json({ message: "Student not registered" });
      }
      const validPassword = await bcrypt.compare(password, student.password);
      if (!validPassword) {
        return res.json({ message: "Invalid password" });
      }
      const token = jwt.sign(
        { username: student.username, role: "student" },
        process.env.Student_Key
      );
      res.cookie("token", token, { httpOnly: true, secure: true });
      // res.cookie("token", token);
      return res.json({ login: true, role: "student" });
    } else {
    }
  } catch (err) {
    res.json(err);
  }
});

// protected route to verify admin ie middleware
const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Invalid Authorization" });
  } else {
    jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
      if (err) {
        res.json({ message: "Invalid Authorization token" });
      } else {
        req.username = decoded.username;
        req.role = decoded.role;
        next();
      }
    });
  }
};

// logout middleware
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Invalid User" });
  } else {
    jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
      if (err) {
        jwt.verify(token, process.env.Student_Key, (err, decoded) => {
          if (err) {
            res.json({ message: "Invalid Authorization token" });
          } else {
            req.username = decoded.username;
            req.role = decoded.role;
            next();
          }
        });
      } else {
        req.username = decoded.username;
        req.role = decoded.role;
        next();
      }
    });
  }
};

// logout middleware
router.get("/verify", verifyUser, (req, res) => {
  return res.json({ login: true, role: req.role });
});

// logout route
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ logout: true });
});

export { router as AdminRouter, verifyAdmin };
