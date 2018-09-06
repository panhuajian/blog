import React, { Component } from 'react'
import Banner from '@/components/Home/Banner'
import BlogClass from '@/components/Home/BlogClass'
import ArticleList from '@/components/Home/ArticleList'
// import banner1 from '@/assets/img/banner1.jpg'
import banner2 from '@/assets/img/banner2.jpg'
import banner3 from '@/assets/img/banner3.jpg'
import './index.scss'

export default class ContRight extends Component {
  constructor () {
    super()
    this.state = {}
  }
  render () {
    return (
      <div className="cont_right">
        <Banner>
          <div className="banner_img"><img src={banner2} alt="banner图"/></div>
          <div className="banner_img"><img src={banner2} alt="banner图"/></div>
          <div className="banner_img"><img src={banner3} alt="banner图"/></div>
        </Banner>
        <BlogClass></BlogClass>
        <ArticleList></ArticleList>
      </div>
    )
  }
}