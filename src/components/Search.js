import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import * as BooksAPI from "../BooksAPI";
// our modules
import Book from "./Book";
import Header from "./Header";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      query: ""
    };
    this.searchDelay = 500;
  }

  resetBookList() {
    this.setState({ books: [] });
  }

  // Handles predefined searches from a link, like /search?search=rowling.
  componentWillMount() {
    const query = queryString.parse(location.search);
    if (query.q) {
      this.handleSearchInput(query.q);
    }
  }

  handleSearchInput(searchQuery) {
    const queryCopy = searchQuery;
    this.setState(state => (state.query = searchQuery));

    setTimeout(() => {
      if (queryCopy === "") {
        this.resetBookList();
        return;
      }
      // Only if the query is unchanged after 500 ms, do we do a search.
      if (this.state.query === queryCopy) {
        BooksAPI.search(this.state.query).then(books => {
          if (books.error) {
            this.resetBookList();
            return;
          }
          if (books.length) {
            this.setState(state => {
              state.books = books.map(book => {
                const idx = this.props.findBookInList(book.id);
                return idx !== -1
                  ? this.props.books[idx]
                  : Object.assign(book, { shelf: "none" });
              });
              return state;
            });
          }
        });
      }
      // Pushes the new searchterm to the URL.
      this.props.history.push(`/search?q=${this.state.query}`);
    }, this.searchDelay);
  }

  render() {
    return (
      <div className="search-books">
        <Header />
        <div className="search-books-bar">
          <Link to="/" alt="Close search" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={e => this.handleSearchInput(e.target.value)}
              value={this.state.query}
              autoFocus
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book =>
              <Book
                key={book.id}
                book={book}
                handleBookListChange={this.props.handleBookListChange}
              />
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default withRouter(Search);
