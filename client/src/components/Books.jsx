import { React, useState, useEffect } from "react";
import BookCard from "./BookCard";
import axios from "axios";
import "../css/Book.css";

const Books = ({ role }) => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 4; // Number of books per page

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

  // Calculate index range for current page
  const indexOfLastBook = currentPage * booksPerPage; // 6
  const indexOfFirstBook = indexOfLastBook - booksPerPage; // 0
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Pagination Handlers
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage(
      (prev) =>
        Math.min(prev + 1, Math.ceil(filteredBooks.length / booksPerPage)) //Math.ceil returns the smallest integer greater than or equal to the given number
    );
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1)); //the second param on the Math.max is the min value

  // Function to display pages with ellipsis
  const getPaginationNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      // Show all pages if 5 or fewer pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show the first page
      pageNumbers.push(1);

      if (currentPage > 3) {
        pageNumbers.push("...");
      }

      // Show 2 pages before and after current page
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(currentPage + 1, totalPages - 1);
        i++
      ) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push("...");
      }

      // Always show the last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

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
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <BookCard key={book._id} book={book} role={role} />
          ))
        ) : (
          <p className="no-books">No books found</p>
        )}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>

        {getPaginationNumbers().map((number, index) => (
          <button
            key={index}
            onClick={() => typeof number === "number" && paginate(number)}
            className={currentPage === number ? "active-page" : ""}
            disabled={number === "..."}
          >
            {number}
          </button>
        ))}

        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Books;
