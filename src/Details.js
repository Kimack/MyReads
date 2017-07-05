import React from 'react';
import { Link } from 'react-router-dom';
import placeholder from './bookPlaceholder.json'

class Details extends React.Component {
  state = {
    book: placeholder
  }

  componentDidMount() {
    this.props.getBook(this.props.bookId)
      .then(book => {
        this.setState({book});
      });
  }

  componentWillReceiveProps(nextProps) {
    const {findBookInList, bookId} = nextProps;
    const idx = findBookInList(bookId);
    if (idx !== -1) {
      this.setState({book: nextProps.books[idx]})
    }
  }

  render() {
    const {book} = this.state;
    return (
      <div>
        <Link to="/" style={{textDecoration: 'none'}}>
          <header className="list-books-title">
            <h1>MyReads</h1>
          </header>
        </Link>
        <article className="book-details">
          <section className="book-cover-details">
            <img
              src={book.imageLinks.thumbnail}
              alt="Book Cover"
              width="192"
              height="290"
              style={{
                outline: book.shelf === 'none' ? '2px solid rgba(0,0,0,0.23)' : 'none',
                boxShadow: (book.shelf === 'none' ? 'none' :
                  '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)')
              }}
            />
            <div className="book-shelf-changer book-shelf-changer-details" style={{
              backgroundColor: book.shelf === 'none' ? '#ccc' : '#60ac5d'
            }}>
              <select
                value={book.shelf}
                onChange={
                  (e) => {
                    this.props.handleBookListChange(book, e.target.value)
                    this.setState(Object.assign(book, {shelf: e.target.value}))
                  }
                }>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </section>
          <section className="book-details-heading">
            <h1 className="book-details-title">{book.title}</h1>
            <p>Authors
            {book.authors.map(author => (
              <span key={author} className="book-details-author">{author}</span>
            ))}
            </p>
          </section>
          <p className='book-details-description'>{book.description}</p>
        </article>
      </div>
    )
  }
}

export default Details;
