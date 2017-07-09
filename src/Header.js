import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Link to="/" className="header-link">
      <header className="list-books-title">
        <h1>MyReads</h1>
      </header>
    </Link>
  );
}

export default Header;
