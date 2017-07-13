import React from "react";
import { Link } from "react-router-dom";

function Book({ book, handleBookListChange }) {
  const { id, imageLinks, shelf, title, authors } = book;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <Link to={`/details/${id}`}>
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${imageLinks
                  ? imageLinks.thumbnail
                  : "http://dummyimage.com/128x193/292929/e3e3e3&text=No Cover Available"}")`,
                outline:
                  shelf === "none" ? "2px solid rgba(0,0,0,0.23)" : "none",
                boxShadow:
                  shelf === "none"
                    ? "none"
                    : "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
              }}
            />
          </Link>
          <div
            className="book-shelf-changer"
            style={{
              backgroundColor: shelf === "none" ? "#ccc" : "#60ac5d"
            }}
          >
            <select
              value={shelf}
              onChange={e => handleBookListChange(book, e.target.value)}
            >
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">
          {title}
        </div>
        {authors &&
          authors.map(author =>
            <div key={author} className="book-authors">
              {author}
            </div>
          )}
      </div>
    </li>
  );
}

export default Book;
