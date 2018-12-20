import React, { Component } from 'react'
import Head from '@/components/Head'
import headProtrait from '@/assets/img/head_protrait.jpg'
import { Link } from 'react-router-dom'
import utils from '@/utils'
import axios from '@/axios'
import './index.scss'

class My extends Component {
  constructor () {
    super()
    this.state = {
      navType: 0,
      username: sessionStorage.getItem('username'),
      articleData: null
    }
  }
  clickHandler (type) {
    this.setState({
      navType: type
    })
  }
  render () {
    const { navType, username, articleData } = this.state
    return (
      <div className="my">
        <Head></Head>
        <div className="my_cont">
          <div className="my_left">
            <div className="user_info">
              <img src={headProtrait} alt="头像"/>
              <div className="info">
                <a className="username">{username}</a>
                <div className="info_detail">
                  <a><span>0</span><span>关注 > </span></a>
                  <a><span>0</span><span>粉丝 > </span></a>
                  <a><span>0</span><span>文章 > </span></a>
                  <a><span>0</span><span>字数 > </span></a>
                  <a><span>0</span><span>喜欢 > </span></a>
                </div>
              </div>
            </div>
            <div className="my_nav">
              <a className={navType === 0 ? 'a_active' : ''} onClick={this.clickHandler.bind(this, 0)}><i className="iconfont icon-wenzhang"></i>文章</a>
              <a className={navType === 1 ? 'a_active' : ''} onClick={this.clickHandler.bind(this, 1)}><i className="iconfont icon-dongtai"></i>动态</a>
              <a className={navType === 2 ? 'a_active' : ''} onClick={this.clickHandler.bind(this, 2)}><i className="iconfont icon-pinglun"></i>最新评论</a>
              <a className={navType === 3 ? 'a_active' : ''} onClick={this.clickHandler.bind(this, 3)}><i className="iconfont icon-remen"></i>热门</a>
            </div>
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
                      {item.content.indexOf('![avatar](') > -1 && <div className="article_img"><img src={item.content.split('![avatar](')[1].split(')')[0]} alt=""/></div>}
                    </li>
                  )
                })}
              </ul>}
            </div>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount () {
    // debugger
    const data = {
      type: 3,
      author: this.state.username
    }
    axios.axiosPost(utils.requestAddr.article, data, res => {
      this.setState({
        articleData: res.data.data
      })
    })
  }
}

export default My