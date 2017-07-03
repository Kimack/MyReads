import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends Component {
  constructor(props) {
    super(props)

    this.query = ''
    this.state = {
      books: []
    }
  }
  resetBooks() {
    this.setState({books: []})
  }
  handleSearchInput(e) {
    const query = e.target.value;
    this.query = query;
    setTimeout(() => {
      if (!query) {
        this.resetBooks()
      } else if (this.query === query) {
        BooksAPI.search(this.query)
          .then(books => {
            if (books.error) {
              this.resetBooks();
            }
            if (books.length) {
              this.setState(state => {
                state.books = books.map(book => {
                  const inListAlready = this.props.books.find(b => b.id === book.id)
                  return inListAlready ? inListAlready :
                                         Object.assign(book, {shelf: 'none'})
                })
                return state;
              })
            }
          })
      }
      return;
    }, 500)
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' alt='Close search' className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(e) => this.handleSearchInput(e)}
              autoFocus
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books
              .map(book => (
                <Book
                  key={book.id}
                  book={book}
                  handleBookChange={this.props.handleBookChange}
                />
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;