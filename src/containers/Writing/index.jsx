import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Article from '@/components/Writing/Article'
import Priview from '@/components/Writing/Preview'

class Writing extends Component {
  constructor () {
    super()
    this.state = {}
  }
  render () {
    return (
      <Router>
        <div style={{height: '100%'}}>
          <Route exact path="/writing" component={ Article }></Route>
          <Route path="/writing/preview" component={ Priview }></Route>
        </div>
      </Router>
    )
  }
}

export default Writing