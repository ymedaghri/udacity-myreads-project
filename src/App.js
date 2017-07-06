import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import './App.css';

const CURRENTLY_READING={code:'currentlyReading', label:'Currently Reading'}
const WANT_TO_READ={code:'wantToRead', label:'Want to Read'}
const READ={code:'read', label:'Read'}

class BooksApp extends Component {
  state = {
    books:[]
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=> {
      this.setState({ books })
    })
  }

  onMoveBookToShelf = (book, shelf) => {
    this.setState((state) => ({
      books: state.books.map((b) => {
        if (b.id === book.id){
          BooksAPI.update(b, shelf)
          b.shelf=shelf
        }
          return b
      })
    }))
  }

  render() {
    return (
      <div className="app">
      <Route path='/search' render={()=>(
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search">Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}
      />
      <Route exact path='/' render={()=>(
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf shelf={CURRENTLY_READING} books={this.state.books} onMoveBookToShelf={this.onMoveBookToShelf}/>
                <BookShelf shelf={WANT_TO_READ} books={this.state.books} onMoveBookToShelf={this.onMoveBookToShelf}/>
                <BookShelf shelf={READ} books={this.state.books} onMoveBookToShelf={this.onMoveBookToShelf}/>
              </div>
            </div>
            <div className="open-search">
              <a>Add a book</a>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp;
