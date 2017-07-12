import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import sleep from "then-sleep";
import queryString from "query-string";
// our modules
import * as BooksAPI from "../BooksAPI";
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

  // Pushes the new searchterm to the URL.
  updateQueryString(searchQuery) {
    this.props.history.push(
      searchQuery !== "" ? `/search?q=${searchQuery}` : "/search"
    );
  }

  async handleSearchInput(searchQuery) {
    this.updateQueryString(searchQuery);
    this.setState(state => (state.query = searchQuery));

    if (searchQuery === "") {
      this.resetBookList();
      return;
    }

    // Only if the query is unchanged after searchDelay ms, do we do a search.
    await sleep(this.searchDelay);

    // If this.state.query has changed after sleeping for this.searchDelay ms
    // a new handleSearchInput() event has been called, so we exit this one.
    if (this.state.query !== searchQuery) return;

    try {
      const books = await BooksAPI.search(this.state.query);
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
    } catch (e) {
      console.error(`The API responded with an error: ${e}`);
    }
  }

  // Handles searches from a link/bookmark as well as reloads.
  // Example: /search?q=robot.
  componentWillMount() {
    const query = queryString.parse(location.search);
    if (query.q) {
      this.handleSearchInput(query.q);
    }
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
