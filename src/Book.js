import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
static propTypes = {
    book: PropTypes.object.isRequired,
    onMoveBookToShelf: PropTypes.func.isRequired
  }
	render() {
		const { book, onMoveBookToShelf } = this.props
		return (
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={
                    { width:`${192}`, height:`${192}`, backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail})` }
                  }></div>
                  <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={(e) => onMoveBookToShelf(book, e.target.value)}>
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
			)
	}
}

export default Book