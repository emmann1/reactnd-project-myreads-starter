import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import DisplayBooks from './Components/displayBooks'
import Search from './Components/search'
import './App.css'

class BooksApp extends React.Component {
  state = {
    allBooks: []
  }

  componentDidMount= () => {
    this.updateBooks();
  }

  updateBooks = () => {
    BooksAPI.getAll()
    .then(allBooks => 
      this.setState({allBooks})
    )
  }

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(this.updateBooks)
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <DisplayBooks books={ this.state.allBooks} updateShelf={ this.updateBookShelf } />
        )}
        />
        <Route path='/search' render={() => (
          <Search
          books={ this.state.allBooks}
          updateShelf={ this.updateBookShelf } />
      )}/>

      </div>
    )
  }
}

export default BooksApp