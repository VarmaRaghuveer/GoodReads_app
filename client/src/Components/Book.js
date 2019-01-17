import React, { Component, Fragment } from 'react';
import Navbar from './navbar';
import { NavLink } from 'react-router-dom';
import config from '../Config/config';

export default class Book extends Component {

    state = {
        'book': null,
        'errorMessage': '',
        'infoMessage': '',
        'isLoading': false
    }

    componentWillMount = async () => {
        try{
            this.setState({'errorMessage': '', 'isLoading': true});
            //create url to fetch book details
            const url = `${config.SERVER_URL}${this.props.location.pathname}`;
            const data = await fetch(url);
            const response = await data.json();
            //if books list is found set it to state
            this.setState({
                'book': response.books,
                'isLoading': false
            });

            // if error recieved from server save to set
            if(response.error){
                this.setState({
                    'infoMessage': 'Ooops!!! No book found...',
                    'book': null
                })
            }
        } catch(err){
            // if error occured save to set
            this.setState({
                'errorMessage': 'Something went wrong, please try again in some time...',
                'isLoading': false
            });
        }
    }
    render(){

        const book = this.state.book;
        return (
            <Fragment>
                <Navbar />
                <div className="container pt-3">
                    <NavLink to='/'>back</NavLink>
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
                        {/* if book is not empty display details about it else display no book found */}
                        {
                            this.state.book
                            ?
                                    <div className="jumbotron">
                                        <div className="row">
                                            <div className="col-sm-3 col-md-3">
                                                <img height="300" src={book.imageUrl} alt="book_image" />
                                            </div>
                                            <div className="col-sm-9 col-md-9">
                                                <div className="row">
                                                    <h2>{book.title}</h2>
                                                </div>
                                                <div className="row">
                                                    by {book.authors}
                                                </div>
                                                <div className="row pt-1">
                                                    <span className="text-muted">rating&nbsp;</span> {book.averageRating} &nbsp;&nbsp;&nbsp;
                                                    <span className="text-muted">published on&nbsp;</span> {book.publicationDate} &nbsp;&nbsp;&nbsp;
                                                    <span className="text-muted">by&nbsp;</span> {book.publisher} &nbsp;&nbsp;&nbsp;
                                                    <span className="text-muted">total Pages&nbsp;</span> {book.numPages}
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div dangerouslySetInnerHTML={{__html: book.description}}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                :
                                    null
                        }
                </div>
            </Fragment>
        )
    }
}