import React, { Component } from 'react'
import { Row, Col } from 'antd'
import marked from 'marked'
import highlight from 'highlight.js'
// import 'highlight.js/styles/atom-one-dark.css';
import './index.scss'
highlight.initHighlightingOnLoad()

export default class Priview extends Component {
  constructor () {
    super()
    this.state = {
      articleCont: ''
    }
  }
  releaseArticle () {
  }
  componentWillMount() {
    marked.setOptions({
      highlight: code => highlight.highlightAuto(code).value,
    });
  }
  previewHandler () {
    let press = setTimeout(() => {
      clearTimeout(press)
      this.setState({
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        articleCont: this.refs.article.value
      })
    }, 1000)
  }
  render () {
    const { articleCont } = this.state
    console.log(articleCont)
    return (
      <div className="preview">
        <Row>
          <Col span={12} className="preview_left">
            <div>
              <h1>文章标题</h1>
              <div className="set_tag">
                <span onClick={this.releaseArticle.bind(this)}>发布文章</span>
              </div>
              <div className="article_cont">
                <textarea onKeyUp={this.previewHandler.bind(this)} ref="article"></textarea>
              </div>
            </div>
          </Col>
          <Col span={12} className="preview_right">
            <div dangerouslySetInnerHTML={{ __html: marked(articleCont)}}></div>
          </Col>
        </Row>
      </div>
    )
  }
}