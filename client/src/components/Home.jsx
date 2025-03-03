import { React } from "react";
import "../css/Home.css";

const Home = ({ setRole }) => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to The Book Repository</h1>
        <p className="hero-description">
          Discover a world of knowledge and inspiration with our curated
          selection of books.
        </p>
      </div>
      <div className="hero-image"></div>
    </div>
  );
};

export default Home;
