import React from 'react'
import { Link } from 'react-router-dom'
import BookItem from './bookItem'


class DisplayBooks extends React.Component {
    render() {
        return (
            <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                        this.props.books.filter(book => book.shelf==="currentlyReading")
                        .map((book) => 
                            <BookItem key={book.id}
                            book={ book }
                            updateShelf={this.props.updateShelf}
                            shelf={book.shelf} />
                        )
                    }
                    </ol>
                    </div>
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                        this.props.books.filter(book => book.shelf==="wantToRead")
                        .map((book) =>
                            <BookItem key={book.id}
                            book={ book }
                            updateShelf={this.props.updateShelf}
                            shelf={book.shelf}  />
                        )
                    }
                    </ol>
                    </div>
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                        this.props.books.filter(book => book.shelf==="read")
                        .map((book) => 
                            <BookItem key={book.id}
                            book={ book }
                            updateShelf={this.props.updateShelf}
                            shelf={book.shelf}  />
                        )
                    }
                    </ol>
                    </div>
                </div>
                </div>
            </div>
            <div className="open-search">
                <Link to="/search"> Add a Book</Link>
            </div>
            </div>
        )}
}

export default DisplayBooks;