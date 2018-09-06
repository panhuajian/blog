import React, { Component } from 'react'
import img from '@/assets/img/tag.jpg'
import tagData from '@/assets/mock/blogClass.json'
import './index.scss'

export default class BlogClass extends Component {
  constructor () {
    super()
    this.state = {}
  }
  tagHtml () {
    return tagData.map((item, i) => {
      return (
        <div className="tag" key={i}><img src={img} alt=""/><span>{item.name}</span></div>
      )
    })
  }
  render () {
    return (
      <div className="blog_class">
        {this.tagHtml()}
        <div className="more_tilte"><span>更多热门专题 ></span></div>
      </div>
    )
  }
}