import React from "react";
import { Route } from "react-router-dom";
// our modules
import * as BooksAPI from "./BooksAPI";
import "./App.css";
// components
import ListBooks from "./ListBooks";
import Search from "./Search";
import Details from "./Details";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.getBook = this.getBook.bind(this);
    this.findBookInList = this.findBookInList.bind(this);
    this.handleBookListChange = this.handleBookListChange.bind(this);

    this.state = {
      books: []
    };
  }

  findBookInList(id) {
    return this.state.books.findIndex(book => book.id === id);
  }

  async getBook(id) {
    // Checks if the book is already loaded and returns it if it is.
    const bookIdx = this.findBookInList(id);
    if (bookIdx !== -1) {
      return Promise.resolve(this.state.books[bookIdx]);
    }
    // Because the API returns new books with a random shelf assigned, visiting
    // the /details/:id page of a book without loading the books first, (ie.
    // from a bookmark) will mean that we don't know the real state of the book.
    // so the shelf is set to 'none' by default. It will then get updated once
    // the books are loaded in getAllBooks().
    try {
      const book = await BooksAPI.get(id);
      book.shelf = "none";
      return book;
    } catch (e) {
      console.error(`There was an API error: ${e}`);
    }
  }

  async handleBookListChange(book, shelf) {
    // Save the state in case the API messes up.
    const oldState = JSON.parse(JSON.stringify(this.state));
    // Update the state immediately
    const bookIdx = this.findBookInList(book.id);
    if (bookIdx !== -1) {
      this.setState(state => {
        state.books[bookIdx].shelf = shelf;
        return state;
      });
    } else {
      this.setState(state => {
        book.shelf = shelf;
        state.books.push(book);
        return state;
      });
    }
    // Call the API
    try {
      const APIShelfState = await BooksAPI.update({ id: book.id }, shelf);
      const currentShelfState = this.state.books.reduce(
        (acc, book) => {
          if (book.shelf !== "none") acc[book.shelf].push(book.id);
          return acc;
        },
        {
          currentlyReading: [],
          wantToRead: [],
          read: []
        }
      );
      // Check if the API and the current state are in agreement.
      const equal = Object.keys(currentShelfState).every(shelf => {
        return currentShelfState[shelf].every(id =>
          APIShelfState[shelf].includes(id)
        );
      });
      if (!equal) {
        this.setState(oldState);
        console.error(
          "The data returned from the API did not match the current state."
        );
      }
    } catch (e) {
      // reset to the previous state on API error.
      this.setState(oldState);
      console.error(`There was an API error: ${e}`);
    }
  }

  // Gets all the books from the API, that are currently in a list.
  async componentDidMount() {
    try {
      const books = await BooksAPI.getAll();
      this.setState({ books });
    } catch (e) {
      console.error(`There was an API error: ${e}`);
    }
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() =>
            <ListBooks
              books={this.state.books}
              handleBookListChange={this.handleBookListChange}
            />}
        />
        <Route
          path="/search"
          render={() =>
            <Search
              books={this.state.books}
              handleBookListChange={this.handleBookListChange}
              findBookInList={this.findBookInList}
            />}
        />
        <Route
          path="/details/:id"
          render={({ match, location }) =>
            <Details
              books={
                /* If the user is arriving from a bookmark, we need to know
                when the books are loaded, so that we can update the book's
                state appropriately in the details page. */
                this.state.books
              }
              handleBookListChange={this.handleBookListChange}
              findBookInList={this.findBookInList}
              getBook={this.getBook}
              bookId={match.params.id}
            />}
        />
      </div>
    );
  }
}

export default BooksApp;
