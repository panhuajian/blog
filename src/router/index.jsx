import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Home from '@/containers/Home'
import Article from '@/containers/Article'
import Writing from '@/containers/Writing'
import Register from '@/containers/Register'
import My from '@/containers/My'

export default class BlogRouter extends Component {
  render () {
    return (
      <Router>
        <div style={{height: '100%'}}>
          <Route exact path="/" component={ Home }></Route>
          <Route path="/article/:id" component={ Article }></Route>
          <Route path="/writing" component={ Writing }></Route>
          <Route path="/register" component={ Register }></Route>
          <Route path="/my" component={ My }></Route>
        </div>
      </Router>
    )
  }
}