import React from 'react';

class Details extends React.Component {
  state = {
    book: {
      "title": "Booktitle",
      "subtitle": "Subtitle",
      "authors": [
          "Author"
      ],
      "publisher": "Publisher",
      "publishedDate": "Published Date",
      "description": "Book Description",
      "industryIdentifiers": [
          {
              "type": "ISBN_10",
              "identifier": "ISBN_10"
          },
          {
              "type": "ISBN_13",
              "identifier": "ISBN_13"
          }
      ],
      "pageCount": 0,
      "printType": "BOOK",
      "categories": [
          "Categories"
      ],
      "averageRating": 0,
      "ratingsCount": 0,
      "maturityRating": "Maturity Rating",
      "imageLinks": {
          "smallThumbnail": "http://via.placeholder.com/256x386",
          "thumbnail": "http://via.placeholder.com/256x386"
      },
      "language": "Language",
      "previewLink": "",
      "infoLink": "",
      "canonicalVolumeLink": "",
      "id": "ID",
      "shelf": "none"
    }
  }

  componentDidMount() {
    this.props.getBook(this.props.bookId)
      .then(book => {
        this.setState({book});
      });
  }

  render() {
    const {book} = this.state;
    return (
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
    )
  }
}

export default Details;