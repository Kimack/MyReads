import React from 'react';
import { Link } from 'react-router-dom';

function Book(props) {
  const {book} = props;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <Link to={`/details/${book.id}`}>
            <div className="book-cover" style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${book.imageLinks.thumbnail}")`,
              outline: book.shelf === 'none' ? '2px solid rgba(0,0,0,0.23)' : 'none',
              boxShadow: (book.shelf === 'none' ? 'none' :
                '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)')
            }}></div>
          </Link>
          <div className="book-shelf-changer" style={{
            backgroundColor: book.shelf === 'none' ? '#ccc' : '#60ac5d'
          }}>
            <select
              value={book.shelf}
              onChange={
                (e) => props.handleBookListChange(book, e.target.value)
              }>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors.map(author => (
          <div key={author} className="book-authors">{author}</div>
        ))}
      </div>
    </li>
  )
}

export default Book;