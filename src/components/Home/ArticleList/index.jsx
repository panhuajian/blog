import React, { Component } from 'react'
import ArticleData from '@/assets/mock/article.json'
import articleImg from '@/assets/img/article.png'
import { Link } from 'react-router-dom'
import './index.scss'

export default class ArticleList extends Component {
  constructor () {
    super()
    this.state = {}
  }
  render () {
    return (
      <div className="article_list">
        <ul>
          {ArticleData.map((item, i) => {
            return (
              <li key={i}>
                <div className="li_content">
                  {/* 路由跳转并穿传参 */}
                  <Link to={{pathname: '/article', params: {id: 1111222222222}}} className="title">{item.title}</Link>
                  <p className="cont">{item.content}</p>
                  <div className="other_info">
                    <span>{item.author}</span>
                    <span><i className="iconfont icon-duanxin"></i> {item.commentNum}</span>
                    <span><i className="iconfont icon-xin_"></i> {item.likeNum}</span>
                    <span><i className="iconfont icon-zj-"></i> {item.reward}</span>
                  </div>
                </div>
                <div className="article_img"><img src={articleImg} alt=""/></div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}