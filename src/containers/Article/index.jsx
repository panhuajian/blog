import React, { Component } from 'react'

export default class Article extends Component {
  constructor () {
    super()
    this.state = {}
  }
  render () {
    console.log(this.props)
    return (
      <div>我是文章页</div>
    )
  }
}