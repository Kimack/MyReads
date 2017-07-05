import React from 'react';
import { Route } from 'react-router-dom';
// our modules
import * as BooksAPI from './BooksAPI';
import './App.css';
// components
import ListBooks from './ListBooks';
import Search from './Search';
import Details from './Details';

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.getBook = this.getBook.bind(this)
    this.findBookInList = this.findBookInList.bind(this)
    this.handleBookListChange = this.handleBookListChange.bind(this)

    this.state = {
      books: []
    }
  }

  findBookInList(id) {
    return this.state.books.findIndex(book => book.id === id)
  }

  getBook(id) {
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
    return BooksAPI.get(id)
      .then((book) => {
        book.shelf = 'none';
        return book;
      })
  }

  handleBookListChange(book, shelf) {
    BooksAPI.update({id: book.id}, shelf)
      .then((res) => {
        const bookIdx = this.findBookInList(book.id);
        // If the book already exists in a list we only change the shelf.
        if (bookIdx !== -1) {
          this.setState(state => {
            state.books[bookIdx].shelf = shelf;
            return state;
          })
        } else {
          this.setState(state => {
            book.shelf = shelf;
            state.books.push(book);
            return state;
          })
        }
    })
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({books})
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            handleBookListChange={this.handleBookListChange}
          />
        )} />
        <Route path='/search' render={() => (
          <Search
            books={this.state.books}
            handleBookListChange={this.handleBookListChange}
            findBookInList={this.findBookInList}
          />
        )} />
        <Route path='/details/:id' render={({match, location}) => (
          <Details
            books={this.state.books}
            handleBookListChange={this.handleBookListChange}
            findBookInList={this.findBookInList}
            getBook={this.getBook}
            bookId={match.params.id}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
