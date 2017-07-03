import React from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import Search from './Search';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  }
  bookIndex = (id) => {
    return this.state.books.findIndex(b => b.id === id)
  }
  getAllBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({books})
      })
  }
  handleBookChange = (book, shelf) => {
    BooksAPI.update({id: book.id}, shelf)
      .then((res) => {
        const idx = this.bookIndex(book.id);
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
  getBook = (id) => {
    BooksAPI.get(id)
      .then(book => {
        this.setState(state => Object.assign(state, book))
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
            handleBookChange={this.handleBookChange}
          />
        )} />
        <Route path='/search' render={() => (
          <Search
            books={this.state.books}
            handleBookChange={this.handleBookChange}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
