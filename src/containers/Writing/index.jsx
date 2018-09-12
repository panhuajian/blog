import React, { Component } from 'react'
import { Row, Col, Popover } from 'antd'
import { Link } from 'react-router-dom'
import './index.scss'

export default class Writing extends Component {
  constructor () {
    super()
    this.state = {
      corpushActive: 'diary'
    }
  }
  toggleCorpusActive (type) {
    this.setState({
      corpushActive: type
    })
  }
  setTitle () {
    return (
      <div><i className="iconfont icon-xiugai"></i> 修改文集</div>
    )
  }
  setContent () {
    return (
      <div><i className="iconfont icon-shanchu"></i> 删除文集</div>
    )
  }
  render () {
    // console.log('------', this.props)
    const { corpushActive } = this.state
    return (
      <div className="writing">
        <Row>
          <Col className="wirting_left" span={4}>
            <div className="return_home">
              <Link to={{pathname: '/'}}>回到首页</Link>
            </div>
            <div className="set_corpus"><i className="iconfont icon-jiahao1"></i> 新建文集</div>
            <ul className="corpus_list">
              <li className={corpushActive === 'diary' ? 'corpus_active' : ''} onClick={this.toggleCorpusActive.bind(this, 'diary')}>
                <span>日记本</span>
                {corpushActive === 'diary' &&
                <Popover overlayClassName="set_popover" placement="bottomRight" title={this.setTitle()} content={this.setContent()} trigger="click">
                  <i className="iconfont icon-shezhi"></i>
                </Popover>
                }
              </li>
              <li className={corpushActive === 'essay' ? 'corpus_active' : ''} onClick={this.toggleCorpusActive.bind(this, 'essay')}>
                <span>随笔</span>
                {corpushActive === 'essay' &&
                  <Popover overlayClassName="set_popover" placement="bottomRight" title={this.setTitle()} content={this.setContent()} trigger="click">
                    <i className="iconfont icon-shezhi"></i>
                  </Popover>
                }
              </li>
            </ul>
          </Col>
          <Col className="wirting_right" span={20}>
            <div>
              <Row>
                <Col className="set_article" span={8}>
                  <div className="new_article"><i className="iconfont icon-jiahao1"></i> 新建文章</div>
                </Col>
                <Col className="writing_article" span={16}>333</Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}