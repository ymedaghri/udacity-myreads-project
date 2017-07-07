import React, {Component} from 'react'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CURRENTLY_READING={code:'currentlyReading', label:'Currently Reading'}
const WANT_TO_READ={code:'wantToRead', label:'Want to Read'}
const READ={code:'read', label:'Read'}

class ListBooks extends Component {
	static propTypes = {
		books : PropTypes.array.isRequired,
		onMoveBookToShelf: PropTypes.func.isRequired
	}

  render() {
  	const { books, onMoveBookToShelf } = this.props
  	return (
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf shelf={CURRENTLY_READING} books={books} onMoveBookToShelf={onMoveBookToShelf}/>
                <BookShelf shelf={WANT_TO_READ} books={books} onMoveBookToShelf={onMoveBookToShelf}/>
                <BookShelf shelf={READ} books={books} onMoveBookToShelf={onMoveBookToShelf}/>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
          )
  }
}

export default ListBooks