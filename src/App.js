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
  componentDidMount() {
    this.getAllBooks();
  }
  render() {
    // this.getAllBooks();
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks books={this.state.books} />
        )} />
        <Route path='/search' component={Search} />
      </div>
    )
  }
}

export default BooksApp
