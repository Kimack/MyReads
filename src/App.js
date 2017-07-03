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
  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }
  handleBookChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(updatedShelves => {
      this.setState(state => {
        Object.keys(updatedShelves)
          .reduce((acc, s) => {
            return updatedShelves[s].map(bookId => {
              const bookToUpdate = state.books.find(book => book.id === bookId);
              bookToUpdate.shelf = s;
              return bookToUpdate;
            }).concat(acc)
          }, [])
      })
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
        <Route path='/search' component={Search} />
      </div>
    )
  }
}

export default BooksApp
