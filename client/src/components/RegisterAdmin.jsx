import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/RegisterAdmin.css";

const RegisterAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // For success or error messages
  const [isError, setIsError] = useState(false); // To track error messages
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://book-ms-server.vercel.app/admin/register", {
        username,
        password,
      })
      .then((res) => {
        console.log(res);
        setIsError(false); // Reset error state
        setMessage(res.data.message); // Backend sends { message: "..." }

        // Redirect to login after successful registration
        setTimeout(() => navigate("/login"), 2000); // Wait 2 seconds to show success message
      })
      .catch((err) => {
        console.error(err);
        setIsError(true);

        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message); // Show backend error message
        } else {
          setMessage("An unexpected error occurred. Please try again.");
        }
      });
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Register Admin</h2>
        {message && (
          <p className={isError ? "error-message" : "success-message"}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn-register" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterAdmin;
