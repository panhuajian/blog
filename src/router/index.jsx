import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Home from '@/containers/Home'
import Article from '@/containers/Article'

export default class BlogRouter extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}></Route>
          <Route path="/article" component={Article}></Route>
        </div>
      </Router>
    )
  }
}