import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookItem from './bookItem'

class Search extends React.Component{
    state = {
        searchString: '',
        resultedBooks: [],
        redirect: false
    }

    componentDidMount() {
        document.getElementById('searchInput').focus();
    }

    setQuery = (string) => {
        this.setState({searchString : string}, this.searchDatabase);
    }

    searchDatabase = () => {
        if(this.state.searchString) {
            BooksAPI.search(this.state.searchString)
            .then(books => {
                if(books.error){
                    this.setState({resultedBooks: []});
                }else {
                    this.setState({resultedBooks: books});
                }
            })
        }else{
            this.setState({resultedBooks: []})
        }
    }

    checkEscape = () => {
        window.addEventListener('keydown', (event) => {
            if(event.keyCode === 27 ){
                this.setState({redirect: true})
            }
        })
    }

    render() {
        this.checkEscape();

        if (this.state.redirect) {
            return (
              <Redirect to="/"/>
            )
        }
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input id="searchInput" type="text" placeholder="Search by title or author"
                        value={this.state.searchString}
                        onChange={(event) => this.setQuery(event.target.value)}/>
    
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    {
                        this.state.resultedBooks.map((book) => {
                            let shelf = 'none';
                            this.props.books.forEach(item => {
                                if(item.id === book.id) {
                                    shelf = item.shelf;
                                }
                            })
                            return <BookItem
                            key={book.id}
                            book={book}
                            updateShelf={this.props.updateShelf}
                            shelf={shelf} />
                        })
                    }
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search