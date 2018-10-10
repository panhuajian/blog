import React, { Component } from 'react'
// import ArticleData from '@/assets/mock/article.json'
import articleImg from '@/assets/img/article.png'
import axios from '@/axios'
import utils from '@/utils'
import { Link } from 'react-router-dom'
import './index.scss'

export default class ArticleList extends Component {
  constructor () {
    super()
    this.state = {
      articleData: null
    }
  }
  render () {
    const { articleData } = this.state
    return (
      <div className="article_list">
        {articleData && <ul>
          {articleData.map((item, i) => {
            return (
              <li key={i}>
                <div className="li_content">
                  {/* 路由跳转并穿传参 */}
                  <Link to={{pathname: `/article/${item.id}`, params: {id: item.id}, query: {id: item.id}}} className="title">{item.title}</Link>
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
        </ul>}
      </div>
    )
  }
  componentDidMount () {
    const data = {
      type: 1
    }
    axios.axiosPost(utils.requestAddr.article, data, res => {
      debugger
      this.setState({
        articleData: res.data.data
      })
    })
  }
}