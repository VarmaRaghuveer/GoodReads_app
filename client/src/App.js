import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './Components/Home';
import Book from './Components/Book';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* Enabling Router for navigation in the app */}
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/book/:id" component={Book} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;