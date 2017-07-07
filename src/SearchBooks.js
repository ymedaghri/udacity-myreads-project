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
  	const { onAddBookToShelf } = this.props
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
              {books && !books.error && books.map((book)=>(  
              		<li key={book.id}>
            			<Book book={book} onMoveBookToShelf={onAddBookToShelf}/>
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