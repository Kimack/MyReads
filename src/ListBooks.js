import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class ListBooks extends Component {
  render() {
    const shelves = {
      currentlyReading: 'Currently Reading',
      wantToRead: 'Want To Read',
      read: 'read'
    };
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="open-search">
          <Link to='/search' alt='Add books'>Add Books</Link>
        </div>
        {Object.keys(shelves).map((shelf) => {
          return (
            <div key={shelf} className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{shelves[shelf]}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.props.books
                        .filter(book => book.shelf === shelf)
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
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default ListBooks;