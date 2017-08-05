import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css';

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
    BooksAPI.update(book, shelf)

    book.shelf=shelf

    this.setState((state) => (
    (shelf==='none')?{books: state.books.filter(book2=>book2.id!=book.id)}:{books: state.books}
    ))

  }

  onAddBookToShelf = (book, shelf) => {

    BooksAPI.update(book, shelf)

    book.shelf=shelf

    this.setState((state) => ({
      books: state.books.concat([book])
    }))


  }

  render() {
    return (
      <div className="app">
      <Route path='/search' render={()=>(
        <SearchBooks existingBooks={this.state.books} onAddBookToShelf={this.onAddBookToShelf}/>
        )}
      />
      <Route exact path='/' render={()=>(
        <ListBooks books={this.state.books} onMoveBookToShelf={this.onMoveBookToShelf}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
