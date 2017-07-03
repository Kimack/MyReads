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
    BooksAPI.getAll()
      .then((books) => {
        this.setState({books})
      })
  }
  handleBookChange = (id, shelf) => {
    BooksAPI.update({id}, shelf)
      .then(() => {
        this.setState(state => state.books
          .map(b => b.id === id ? Object.assign(b, {shelf}) : b))
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
        <Route path='/search' component={Search} />
      </div>
    )
  }
}

export default BooksApp
