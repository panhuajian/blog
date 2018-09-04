import React, { Component } from 'react'
import './head.scss'

export default class Head extends Component {
  constructor () {
    super()
  }
  render () {
    return (
      <div className="head">
        <div className="head_cont">
          <div className="head_log">墨痕</div>
        </div>
      </div>
    )
  }
}