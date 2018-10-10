import React, { Component } from 'react'
import { Row, Col, Modal, Upload, message } from 'antd'
import marked from 'marked'
import highlightjs from 'highlight.js'
import axios from '@/axios'
import utils from '@/utils'
import './index.scss'
highlightjs.initHighlightingOnLoad()

let timeout = null
let timeout2 = null
let selectionStart = null
let selectionEnd = null

// const props = {
//   name: 'file',
//   action: 'http://panhuajian.com:3000/api/upload',
//   onChange(info) {
//     if (info.file.status !== 'uploading') {
//       console.log(info.file)
//       console.log(info.fileList)
//     }
//     if (info.file.status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully`)
//     } else if (info.file.status === 'error') {
//       message.error(`${info.file.name} file upload failed.`)
//     }
//   }
// }

function getBase64(img, callback) {
  debugger
  console.log('img', img)
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  // const isJPG = file.type === 'image/jpeg';
  // if (!isJPG) {
  //   message.error('You can only upload JPG file!');
  // }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  // return isJPG && isLt2M;
  return isLt2M
}

export default class Priview extends Component {
  constructor () {
    super()
    this.state = {
      articleCont: '',
      articleTitle: '',
      visible: false,
      imageUrl: ''
    }
  }
  releaseArticle () {
    const { articleCont, articleTitle } = this.state
    const data = {
      type: 0,
      title: articleTitle,
      content: articleCont,
      author: sessionStorage.getItem('username')
    }
    axios.axiosPost(utils.requestAddr.article, data, res => {
      debugger
    })
  }
  handleOk = () => {
    // console.log(e);
    this.setState({
      visible: false
    })
  }
  handleCancel = () => {
    // console.log(e);
    this.setState({
      visible: false
    })
  }
  handleChange = (info) => {
    // debugger
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        debugger
        this.setState({
          imageUrl,
          loading: false,
        })
      })
      debugger
      const obj = this.refs.article
      const str = `![avatar](http://panhuajian.com${info.file.response.data})`
      let cursorPos = selectionStart
      const tmpStr = obj.value
      obj.value = tmpStr.substring(0, selectionStart) + str + tmpStr.substring(selectionEnd, tmpStr.length);
      cursorPos += str.length;
      obj.selectionStart = obj.selectionEnd = cursorPos;
    }
  }
  insertImg () {
    this.setState({
      visible: true
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
  previewHandler () {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      const articleCont = this.refs.article.value
      // const articleCont = this.refs.article.value.replace(/\n/g, '2222')
      // console.log(this.refs.article.value === '```\n11111\n```')
      // console.log(this.refs.article.value)
      // this.refs.previewArticle.innerHTML = ''
      this.setState({
        articleCont
      })
    }, 1000)
  }
  tabHandler (e) {
    const obj = this.refs.article
    selectionStart = obj.selectionStart
    selectionEnd = obj.selectionEnd
    if (e.keyCode === 9) {
      // if (!this.textareValue) this.textareValue= ''
      const str = '    '
      if (document.selection) {
        let sel = document.selection.createRange();
        sel.text = str;
      } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        let startPos = obj.selectionStart,
        endPos = obj.selectionEnd,
        cursorPos = startPos,
        tmpStr = obj.value;
        obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
        cursorPos += str.length;
        obj.selectionStart = obj.selectionEnd = cursorPos;
      } else {
        obj.value += str;
      }
      // 阻止默认切换元素的行为
      if (e && e.preventDefault) {
        e.preventDefault()
      } else {
        window.event.returnValue = false
      }
    }
  }
  changeArticleTitle (e) {
    // console.log('1111', e.target)
    const target = e.target
    clearTimeout(timeout2)
    timeout2 = setTimeout(() => {
      // debugger
      // console.log('111', e.target)
      // 备注直接使用e.target会报错，需要将先target = e.target
      const articleTitle = target.value
      this.setState({
        articleTitle
      })
    }, 1000)
  }
  render () {
    const { articleCont, articleTitle, visible, imageUrl } = this.state
    console.log('imgurl', imageUrl)
    // console.log(articleCont)
    // console.log('1111111111111111111', articleCont === '```\n11111\n```')
    return (
      <div className="preview">
        <Row>
          <Col span={12} className="preview_left">
            <div>
              <input defaultValue="文章标题" ref="articleTitle" onKeyUp={this.changeArticleTitle.bind(this)}/>
              <div className="set_tag">
                <span onClick={this.insertImg.bind(this)}><i className="iconfont icon-tupian"></i> 插入图片</span>
                <span onClick={this.releaseArticle.bind(this)}><i className="iconfont icon-fabu"></i> 发布文章</span>
              </div>
              <div className="article_cont">
                <textarea onKeyUp={this.previewHandler.bind(this)} ref="article" onKeyDown={this.tabHandler.bind(this)}></textarea>
              </div>
            </div>
          </Col>
          <Col span={12} className="preview_right">
            {/* <div dangerouslySetInnerHTML={{ __html: marked('```php\n11111\n```')}}></div> */}
            <div className="preview_title">{articleTitle}</div>
            <div className="preview_article" ref="previewArticle" dangerouslySetInnerHTML={{ __html: marked(articleCont)}}></div>
          </Col>
        </Row>
        <Modal
          title="插入图片"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action='http://panhuajian.com:3000/api/upload'
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
          >
            <a className="upload_img">点击上传(可多张)</a>
            {/* {imageUrl && <img src={imageUrl} alt="avatar" />} */}
          </Upload>
        </Modal>
      </div>
    )
  }
  componentDidMount () {
    this.setState({
      articleTitle: this.refs.articleTitle.value
    })
  }
}