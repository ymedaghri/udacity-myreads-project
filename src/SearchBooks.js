import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
	static propTypes = {
		onAddBookToShelf: PropTypes.func.isRequired
	}

	state = {
		books: []
	}

	updateQuery = (query) => {
		BooksAPI.search(query).then((books)=> {
			this.setState({ books })
    	})
	}
	render() {
  	const { books } = this.state
  	const { onAddBookToShelf, existingBooks} = this.props
  	return (
          <div className="search-books">
            <div className="search-books-bar">
            	<Link className='close-search' to='/'>Close</Link>
              	<div className="search-books-input-wrapper">
                	<input type="text" placeholder="Search by title or author"
                	onChange={(event) => this.updateQuery(event.target.value)}/>
              	</div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {books && !books.error && books.filter(book1=>{
                return !existingBooks.some(book2=>book2.id===book1.id)
              }).map((book)=>(
              		<li key={book.id}>
            			<Book book={book} onMoveBookToShelf={onAddBookToShelf} displayNone={false}/>
              		</li>
              		))
              }
              </ol>
            </div>
          </div>
          )
  }
}

export default SearchBooks