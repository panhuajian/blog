import React, { Component } from 'react'
import hotImg from '@/assets/img/hot.png'
import author1 from '@/assets/img/author1.jpg'
import author2 from '@/assets/img/author2.jpg'
import authorData from '@/assets/mock/author.json'
import './index.scss'

export default class ContRight extends Component {
  constructor () {
    super()
    this.state = {
      authorIndex: 0
    }
  }
  hotList () {
    let hostList = []
    for (let i = 0; i < 5; i++) {
      hostList.push(
        <li key={i}><img src={hotImg} alt=""/></li>
      )
    }
    return hostList
  }
  toggleAuthor () {
    this.setState({
      authorIndex: this.state.authorIndex === 0 ? 1 : 0
    })
  }
  render () {
    const { authorIndex } = this.state
    return (
      <div className="cont_right">
        <ul className="right_hot">
          {this.hotList()}
        </ul>
        <div className="recomment_author">
          <div className="recomment_title">
            <span>推荐作者</span>
            <span onClick={this.toggleAuthor.bind(this)}><i className="iconfont icon-shuaxin"></i> 换一批</span>
          </div>
          <ul className="author_list">
            {authorData.data[authorIndex].map((item, i) => {
              return (
                <li key={i}>
                  <img src={authorIndex === 0 ? author1 : author2} alt=""/>
                  <div>
                    <div>
                      <span>{item.name}</span>
                      <span>+关注</span>
                    </div>
                    <div>
                      <span>写了{item.wordCount}字 · {item.likeNum}喜欢</span>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
} 