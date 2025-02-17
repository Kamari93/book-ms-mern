import { React, useState, useEffect } from "react";
import BookCard from "./BookCard";
import axios from "axios";
import "../css/Book.css";

const Books = ({ role }) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/book/books")
      .then((res) => {
        setBooks(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="book-list">
      {books.map((book) => {
        return <BookCard key={book._id} book={book} role={role} />;
      })}
    </div>
  );
};

export default Books;
