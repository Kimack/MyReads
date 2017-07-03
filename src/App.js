import React from 'react';
import { Route } from 'react-router-dom';
// our modules
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  // Returns the index of a book that's already in a list,
  // or -1 if it's not in a list.
  findBookInList = (id) => {
    return this.state.books.findIndex(book => book.id === id)
  }

  getAllBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({books})
      })
  }

  handleBookListChange = (book, shelf) => {
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
      </div>
    )
  }
}

export default BooksApp
