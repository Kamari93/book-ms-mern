import { React, useState, useEffect } from "react";
import BookCard from "./BookCard";
import axios from "axios";
import "../css/Book.css";

const Books = ({ role }) => {
  const [books, setBooks] = useState([]);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("https://book-ms-server.vercel.app/book/books")
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
