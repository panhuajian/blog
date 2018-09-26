import React, { Component } from 'react'
import './index.scss'

export default class Banner extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bannerStyle: {},
      contStyle: {}
    }
  }
  render () {
    const { bannerStyle, contStyle } = this.state
    return (
      <div className="banner" ref="banner" style={bannerStyle}>
        <div className="banner_cont" ref="bannerCont" style={contStyle}>
          {this.props.children}
        </div>
      </div>
    )
  }
  componentDidMount () {
    const childLen = this.refs.bannerCont.children.length
    const newNode = this.refs.bannerCont.children[0].cloneNode(true)
    this.refs.bannerCont.appendChild(newNode)
    this.setState({
      bannerStyle: {
        width: this.refs.bannerCont.children[0].offsetWidth + 'px ',
        height: this.refs.bannerCont.children[0].offsetHeight + 'px'
      },
      contStyle: {
        width: this.refs.bannerCont.children[0].offsetWidth * (childLen + 1) + 'px',
        height: this.refs.bannerCont.children[0].offsetHeight + 'px'
      }
    })
  }
}