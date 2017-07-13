import React from "react";
// our modules
import Header from "./Header";
import Rating from "./Rating";
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

  // If the user is arriving from a bookmark, we need to know when the books
  // are loaded, so that we can update the book's state appropriately in the
  // details page.
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
    const rating = book.averageRating
      ? <Rating rating={book.averageRating} />
      : "";
    return (
      <div>
        <Header />
        <article className="book-details">
          <section className="book-cover-details">
            <img
              src={
                imageLinks
                  ? imageLinks.thumbnail
                  : "http://dummyimage.com/256x386/292929/e3e3e3&text=No Cover Available"
              }
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
            {rating}
            <p>By</p>
            {authors &&
              authors.map(author =>
                <p key={author} className="book-details-author">
                  {author}
                </p>
              )}
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
