import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import './index.scss'

export default class Writing extends Component {
  constructor () {
    super()
    this.state = {}
  }
  render () {
    // console.log('------', this.props)
    return (
      <div className="writing">
        <Row>
          <Col className="wirting_left" span={4}>
            <div className="return_home">
              <Link to={{pathname: '/'}}>回到首页</Link>
            </div>
            <div className="set_corpus"><i className="iconfont icon-jiahao1"></i> 新建文集</div>
            <ul>
              <li>日记本<i className="iconfont icon-shezhi"></i></li>
              <li>随笔 <i className="iconfont icon-shezhi"></i></li>
            </ul>
          </Col>
          <Col className="wirting_right" span={20}>
            <div>
              <Row>
                <Col className="set_article" span={8}>222</Col>
                <Col className="writing_article" span={16}>333</Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}