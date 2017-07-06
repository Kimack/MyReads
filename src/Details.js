import React from "react";
import { Link } from "react-router-dom";
// our modules
import placeholder from "./bookPlaceholder.json";

class Details extends React.Component {
  state = {
    book: placeholder
  };

  componentDidMount() {
    const { getBook, bookId } = this.props;
    getBook(bookId).then(book => {
      this.setState({ book });
    });
  }

  // If the user is coming to the details page from a link, we have to update
  // the book whenever the API has returned all the listed books.
  componentWillReceiveProps(nextProps) {
    const { findBookInList, bookId, books } = nextProps;
    const bookIndex = findBookInList(bookId);
    if (bookIndex !== -1) {
      this.setState({ book: books[bookIndex] });
    }
  }

  render() {
    const { book } = this.state;
    const { imageLinks, shelf, title, authors, description } = book;
    return (
      <div>
        <Link to="/" className="header-link">
          <header className="list-books-title">
            <h1>MyReads</h1>
          </header>
        </Link>
        <article className="book-details">
          <section className="book-cover-details">
            <img
              src={imageLinks.thumbnail}
              alt="Book Cover"
              width="192"
              height="290"
              style={{
                outline:
                  shelf === "none" ? "2px solid rgba(0,0,0,0.23)" : "none",
                boxShadow:
                  shelf === "none"
                    ? "none"
                    : "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
              }}
            />
            <div
              className="book-shelf-changer book-shelf-changer-details"
              style={{
                backgroundColor: shelf === "none" ? "#ccc" : "#60ac5d"
              }}
            >
              <select
                value={shelf}
                onChange={e => {
                  this.props.handleBookListChange(book, e.target.value);
                  this.setState(Object.assign(book, { shelf: e.target.value }));
                }}
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
          </section>
          <section className="book-details-heading">
            <h1 className="book-details-title">
              {title}
            </h1>
            <p>
              Authors
              {authors.map(author =>
                <span key={author} className="book-details-author">
                  {author}
                </span>
              )}
            </p>
          </section>
          <p className="book-details-description">
            {description}
          </p>
        </article>
      </div>
    );
  }
}

export default Details;
