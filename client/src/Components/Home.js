import React, { Component, Fragment } from 'react';
import Navbar from './navbar';
import BooksList from './booksList';
import config from '../Config/config';

export default class Home extends Component {

    state = {
        'list': [],
        'titleSearch': '',
        'errorMessage': '',
        'infoMessage': '',
        'isLoading': false
    }

    handleSearch = async e => {
        e.preventDefault();
        if(this.state.titleSearch !== ''){
            this.setState({'errorMessage': '', 'infoMessage': '', 'isLoading': true});
            const url = `${config.SERVER_URL}/book?title=${this.state.titleSearch}`;
            const data = await fetch(url);
            const response = await data.json();
            this.setState({
                'list': response.books,
                'isLoading': false
            });
            if(response.books.length === 0){
                this.setState({
                    'infoMessage': 'Ooops!!! No book found...'
                })
            }

        } else {
            this.setState({
                'errorMessage': 'Please enter a book name'
            });
        }
    }

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
                        {
                            this.state.isLoading
                                ?
                                    <div className="text-center">
                                        <img src="/img/loading.gif" alt="loading" />
                                    </div>
                                :
                                    null
                        }
                        {
                            this.state.errorMessage !== ''
                                ?
                                    <div className="alert alert-dismissible alert-danger text-center">
                                        <strong>{this.state.errorMessage}</strong>
                                    </div>
                                :
                                    null
                        }
                        <BooksList list={this.state.list} />
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