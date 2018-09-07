import React, { Component } from 'react'
import BlogRouter from './router'
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BlogRouter/>
      </div>
    );
  }
}

export default App;
