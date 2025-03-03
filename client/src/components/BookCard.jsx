import { React, useState } from "react";
import "../css/Book.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BookCard = ({ book, role }) => {
  const { title, author, imageUrl, totalCopies } = book;
  // const [message, setMessage] = useState("");
  const truncateTitle = (title) => {
    return title.length > 15 ? title.slice(0, 15) + "..." : title;
  };

  const handleCheckout = (bookId) => {
    axios
      .post(`https://book-ms-server.vercel.app/book/checkout/${bookId}`)
      .then((res) => {
        alert(res.data.message); // Display message in an alert
        window.location.reload(); // Reload after showing the alert
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Checkout failed"); // Handle errors
      });
  };
  return (
    <div className="book-card">
      <img src={imageUrl} alt={title} className="book-image" />
      <div className="book-details">
        <h3>{truncateTitle(title)}</h3>
        <p>Author: {author}</p>
        <p>Available Copies: {totalCopies}</p>
      </div>
      {role === "admin" ? (
        // Admin actions: Edit & Delete
        <div className="book-actions">
          <Link to={`/book/${book._id}`} className="btn-link">
            <button>Edit</button>
          </Link>
          <Link to={`/delete/${book._id}`} className="btn-link">
            <button>Delete</button>
          </Link>
        </div>
      ) : role === "student" ? (
        // Student actions: View & Checkout (only if logged in as student)
        <div className="book-actions">
          <Link to={`/viewbook/${book._id}`} className="btn-link">
            <button>View</button>
          </Link>
          <div className="btn-link">
            <button
              onClick={() => handleCheckout(book._id)}
              className="checkout-btn"
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        // No actions if no one is logged in or role is undefined
        <div className="book-actions">
          <Link to={`/viewbook/${book._id}`} className="btn-link">
            <button>View</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookCard;
