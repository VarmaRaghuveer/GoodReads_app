import React, { Component, Fragment } from 'react';
import Navbar from './navbar';
import BooksList from './booksList';

//consists of URL, no secret keys
import config from '../Config/config';

export default class Home extends Component {

    state = {
        'list': [],
        'titleSearch': '',
        'errorMessage': '',
        'infoMessage': '',
        'isLoading': false
    }

    //Function to get books list from server when something is searched
    handleSearch = async e => {
        e.preventDefault();
        if(this.state.titleSearch !== ''){
            //Handling loading, error and info messages
            this.setState({'errorMessage': '', 'infoMessage': '', 'isLoading': true});
            const url = `${config.SERVER_URL}/book?title=${this.state.titleSearch}`;

            //Hitting backend server to get details
            const data = await fetch(url);

            //converting promise to json (because of fetch api)
            const response = await data.json();

            // setting data in state
            this.setState({
                'list': response.books,
                'isLoading': false
            });

            //If no books ound for input
            if(response.books.length === 0){
                this.setState({
                    'infoMessage': 'Ooops!!! No book found...'
                })
            }

        } else {
            //If no input is entered and search button is clicked
            this.setState({
                'errorMessage': 'Please enter a book name'
            });
        }
    }

    //function to retrieve value from search box
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render(){
        return(
            <Fragment>
                <Navbar />
                <div className="container">
                    <div className="col-sm-12 col-md-12">
                        {/* form to get input from the user */}
                        <form className="form m-2 pt-3">
                            <input className="form-control mr-sm-2"
                                type="text"
                                name="titleSearch"
                                onChange={e => this.handleChange(e)}
                                placeholder="Enter Book Name, ISBN, Author Name" />
                            <button
                                className="btn btn-secondary m-2 my-sm-2"
                                onClick={e => this.handleSearch(e)}>
                                Search
                            </button>
                        </form>
                    </div>
                    <div className="col-sm-12 col-md-12">
                        <hr />
                        {/* if state is loading means some operation is going on */}
                        {
                            this.state.isLoading
                                ?
                                    <div className="text-center">
                                        <img src="/img/loading.gif" alt="loading" />
                                    </div>
                                :
                                    null
                        }
                        {/* if error found while doing operation */}
                        {
                            this.state.errorMessage !== ''
                                ?
                                    <div className="alert alert-dismissible alert-danger text-center">
                                        <strong>{this.state.errorMessage}</strong>
                                    </div>
                                :
                                    null
                        }
                        {/* Display al books in list format in BooksList component  */}
                        <BooksList list={this.state.list} />
                        {/* display info for ongoing operation */}
                        {
                            this.state.infoMessage !== ''
                            ?
                                <div className="alert alert-info text-center">
                                    <strong>{this.state.infoMessage}</strong>
                                </div>
                            :
                                null
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
}