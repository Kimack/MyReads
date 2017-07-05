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
    const bookIdx = this.findBookInList(id);
    if (bookIdx !== -1) {
      return Promise.resolve(this.state.books[bookIdx]);
    }
    // Because the API returns new books with a random shelf assigned, visiting
    // the /details/:id page of a book without loading the books first, will
    // mean that we don't know the real state of the book. At this point we're
    // not going to jump through hoops because of inconsistent DB design, so
    // the shelf is set to 'none' by default.
    return BooksAPI.get(id)
      .then((book) => {
        book.shelf = 'none';
        this.setState(state => {
          state.books.push(book);
          return state;
        })
        return book;
      })
  }

  getAllBooks() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({books})
      })
  }

  handleBookListChange(book, shelf) {
    BooksAPI.update({id: book.id}, shelf)
      .then((res) => {
        const idx = this.findBookInList(book.id);
        // If the book already exists in a list we only change the shelf.
        if (idx !== -1) {
          this.setState(state => {
            state.books[idx].shelf = shelf;
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
    this.getAllBooks();
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
            getBook={this.getBook}
            bookId={match.params.id}
            handleBookListChange={this.handleBookListChange}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
