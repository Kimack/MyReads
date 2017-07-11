import React from "react";
import { Link } from "react-router-dom";
import startCase from "lodash.startcase";
// our modules
import Book from "./Book";
import Header from "./Header";

function ListBooks({ books, handleBookListChange }) {
  const shelves = ["currentlyReading", "wantToRead", "read"];
  return (
    <div className="list-books">
      <Header />
      <div className="open-search">
        <Link to="/search" alt="Add books">
          Add Books
        </Link>
      </div>
      {shelves.map(shelf => {
        return (
          <div key={shelf} className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">
                  {startCase(shelf)}
                </h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books
                      .filter(book => book.shelf === shelf)
                      .map(book =>
                        <Book
                          key={book.id}
                          book={book}
                          handleBookListChange={handleBookListChange}
                        />
                      )}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListBooks;
