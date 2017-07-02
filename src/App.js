import React from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import Search from './Search';
// import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' component={ListBooks} />
        <Route path='/search' component={Search} />
      </div>
    )
  }
}

export default BooksApp
