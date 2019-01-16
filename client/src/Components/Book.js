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
            const url = `${config.SERVER_URL}${this.props.location.pathname}`;
            const data = await fetch(url);
            const response = await data.json();
            console.log(JSON.stringify(response));
            this.setState({
                'book': response.books,
                'isLoading': false
            });
            if(response.error){
                this.setState({
                    'infoMessage': 'Ooops!!! No book found...',
                    'book': null
                })
            }
        } catch(err){
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
                        {
                            this.state.infoMessage !== ''
                                ?
                                    <div className="alert alert-info text-center">
                                        <strong>{this.state.infoMessage}</strong>
                                    </div>
                                :
                                    null
                        }
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
                                    console.log('why here')
                        }
                </div>
            </Fragment>
        )
    }
}