import React, { Component } from 'react'
import * as numberActions from '@/actions/other.js'
import * as registerActions from '@/actions/register'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import headProtrait from '@/assets/img/head_protrait.jpg'
import Head from '@/components/Head'
import axios from '@/axios'
import utils from '@/utils'
import marked from 'marked'
import highlightjs from 'highlight.js'
import './index.scss'
highlightjs.initHighlightingOnLoad()


class Article extends Component {
  constructor () {
    super()
    this.state = {
      init: 11,
      articleCont: '',
      articleTitle: '',
      author: '',
      time: ''
    }
    // this.numberAdd = this.numberAdd.bind(this)
  }
  numberAdd () {
    // debugger
    let _this = this
    console.log('this', this)
    console.log('_this', _this)
    console.log('------------', this.state)
    let count = this.props.count
    count++
    this.props.numberActions.changeCount(count)
  }
  numberSubtract () {
    let count = this.props.count
    count--
    this.props.numberActions.changeCount(count)
  }
  getData () {
    let data = {
      type: 0,
      username: 'test4'
      // password: '123456' 
    }
    axios.axiosPost(utils.requestAddr, data, res => {
      debugger
      console.log(res)
    })
  }
  componentWillMount() {
    const renderer = new marked.Renderer();
    renderer.code = (code, language) => {
      // Check whether the given language is valid for highlight.js.
      const validLang = !!(language && highlightjs.getLanguage(language));
      // Highlight only if the language is valid.
      const highlighted = validLang ? highlightjs.highlight(language, code).value : code;
      // Render the highlighted code with `hljs` class.
      return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
    };
    // renderer.code = function(code, lang) {
    //   var language = lang && (' language-' + lang) || '';
    //   return '<pre class="prettyprint' + language + '">'
    //     + '<code class="hljs">' + code.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</code>'
    //     + '</pre>';
    // }
    marked.setOptions({
      renderer
      // highlight: (code) => highlight.highlightAuto(code).value
    });
  }
  render () {
    console.log('+++++++++++', this.props)
    const { articleCont, articleTitle, author, time } = this.state
    return (
      <div className="article">
        {/* <p>{this.props.count}</p>
        <button onClick={this.numberAdd.bind(this)}>+</button>
        ------------------
        <button onClick={this.numberSubtract.bind(this)}>-</button>
        <div>
          <button  onClick={this.getData.bind(this)}>请求数据</button>
        </div> */}
        <Head registerActions={registerActions}></Head>
        <div className="article_detail">
          <h1 className="article_title">{articleTitle}</h1>
          <div className="article_author">
            <img src={headProtrait} alt=""/>
            <ul>
              <li>{author}</li>
              <li>
                <span>{time}</span>
              </li>
            </ul>
          </div>
          <div className="article_cont" dangerouslySetInnerHTML={{ __html: marked(articleCont)}}></div>
        </div>
      </div>
    )
  }
  componentDidMount () {
    debugger
    // console.log('props', this.props)
    const id = window.location.href.split('/').pop()
    const data = {
      type: 2,
      id
    }
    axios.axiosPost(utils.requestAddr.article, data, res => {
      debugger
      this.setState({
        articleCont: res.data.data.content,
        articleTitle: res.data.data.title,
        author: res.data.data.author,
        time: res.data.data.setTime
      })
    })
  }
}
const mapStateToProps = state => {
  // debugger
  return {
    count: state.other.count
  }
}
const mapActionsToProps = dispatch => {
  return {
    numberActions: bindActionCreators(numberActions, dispatch),
    registerActions: bindActionCreators(registerActions, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Article)