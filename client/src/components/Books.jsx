import { React, useState, useEffect } from "react";
import BookCard from "./BookCard";
import axios from "axios";
import "../css/Book.css";

const Books = ({ role }) => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
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

  // Filter books based on title or author
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="book-container">
      <h2>Book List</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} role={role} />
          ))
        ) : (
          <p className="no-books">No books found</p>
        )}
      </div>
    </div>
  );
};

export default Books;
