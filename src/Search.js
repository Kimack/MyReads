import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
// our modules
import Book from './Book';

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.query = ''
    this.state = {
      books: []
    }
    this.searchDelay = 500
  }

  resetBooks() {
    this.setState({books: []})
  }

  trimQuery(query) {
    return query.trim()
  }

  handleSearchInput(e) {
    const queryCopy = e.target.value;
    this.query = queryCopy;

    setTimeout(() => {
      if (queryCopy === '') {
        this.resetBooks();
        return;
      }
      // Only if the query is unchanged after 500 ms, do we do a search.
      if (this.query === queryCopy) {
        BooksAPI.search(this.query)
          .then(books => {
            if (books.error) {
              this.resetBooks();
              return;
            }
            if (books.length) {
              this.setState(state => {
                state.books = books.map(book => {
                  const idx = this.props.findBookInList(book.id)
                  return idx !== -1 ? this.props.books[idx] :
                                      Object.assign(book, {shelf: 'none'})
                })
                return state;
              })
            }
          })
      }
    }, this.searchDelay)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" alt="Close search" className="close-search">Close</Link>
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
                  handleBookListChange={this.props.handleBookListChange}
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
