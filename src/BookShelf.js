import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
  static propTypes = {
    shelf: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    onMoveBookToShelf: PropTypes.func.isRequired
  }

  render() {
    const { shelf, books, onMoveBookToShelf } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.label}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {
            books.filter((book)=> book.shelf===shelf.code).map((book)=>(              
            <li key={book.id}>
            	<Book book={book} onMoveBookToShelf={onMoveBookToShelf}/>
            </li>
              ))
          }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf