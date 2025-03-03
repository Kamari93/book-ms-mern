import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Auto-close dropdown when a link is clicked
  const closeMenu = () => {
    setIsOpen(false);
  };

  const getLinkClass = (path) =>
    location.pathname === path ? "navbar-link active" : "navbar-link";

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          The Book Repo
        </Link>
      </div>

      <div
        className={`navbar-right ${isOpen ? "open" : ""}`}
        onClick={closeMenu}
      >
        <Link to="/books" className={getLinkClass("/books")}>
          Books
        </Link>

        {role === "admin" && (
          <>
            <Link to="/addbook" className={getLinkClass("/addbook")}>
              Add Book
            </Link>
            <Link to="/addstudent" className={getLinkClass("/addstudent")}>
              Add Student
            </Link>
            <Link to="/studenttable" className={getLinkClass("/studenttable")}>
              All Students
            </Link>
            <Link to="/admintable" className={getLinkClass("/admintable")}>
              All Admin
            </Link>
            <Link to="/dashboard" className={getLinkClass("/dashboard")}>
              Dashboard
            </Link>
          </>
        )}

        {role === "student" && (
          <Link
            to="/studentbookstable"
            className={getLinkClass("/studentbookstable")}
          >
            My Books
          </Link>
        )}

        {role === "" ? (
          <>
            <Link to="/login" className={getLinkClass("/login")}>
              Login
            </Link>
            <Link
              to="/registeradmin"
              className={getLinkClass("/registeradmin")}
            >
              Register Admin
            </Link>
          </>
        ) : (
          <Link to="/logout" className={getLinkClass("/logout")}>
            Logout
          </Link>
        )}
      </div>

      {/* Hamburger Menu Icon */}
      <div className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
