import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Input, Popover, Button, Menu, Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import './index.scss'
import headProtrait from '@/assets/img/head_protrait.jpg'

const Search = Input.Search

export default class Head extends Component {
  constructor () {
    super()
    this.state = {
      isHome: true,
      isFocus: false,
      isNight: false,
      isShowPopover: false,
      currentSpan: sessionStorage.getItem('username') ? 'discover' : 'home',
      count: 0
    }
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  changeCurrentSpan (type) {
    this.setState({
      currentSpan: type
    })
  }
  focusHandler () {
    this.setState({
      isFocus: true
    })
  }
  blurHandler () {
    this.setState({
      isFocus: false
    })
  }
  toggleModel (type) {
    this.setState({
      isNight: !this.state.isNight
    })
    if (type === 'night') {
      document.getElementsByTagName('body')[0].style.background = '#3f3f3f'
      this.refs.moom.style.color = '#c5c514'
    } else {
      document.getElementsByTagName('body')[0].style.background = '#fff'
      this.refs.moom.style.color = '#969696'
    }
  }
  togglePopover () {
    this.setState({
      isShowPopover: !this.state.isShowPopover
    })
  }
  setTitleHtml () {
    return (
      <div className="set_title">
        <div>
          <span><i className="iconfont icon-gray-moon" ref="moom"></i> 夜间模式</span>
        </div>
        <div>
          <Button className={this.state.isNight ? 'title_button title_turn_on title_button_active' : 'title_button title_turn_on'} onClick={this.toggleModel.bind(this, 'night')}>开</Button>
          <Button className={!this.state.isNight ? 'title_button title_turn_off title_button_active' : 'title_button title_turn_off'} onClick={this.toggleModel.bind(this, 'day')}>关</Button>
        </div>
      </div>
    )
  }
  // 路由跳转并传参
  jumpWriting () {
    const username = sessionStorage.getItem('username')
    if (username) {
      this.context.router.history.push({
        pathname: '/writing/preview',
        params: {
          id: 222233333
        }
      })
    } else {
      this.context.router.history.push({
        pathname: '/register'
      })
      this.props.registerActions.setRegisterType('login')
    }
  }
  registerHandler () {
    this.context.router.history.push({
      pathname: '/register'
    })
    this.props.registerActions.setRegisterType('register')
  }
  loginHandler () {
    this.context.router.history.push({
      pathname: '/register'
    })  
    this.props.registerActions.setRegisterType('login')
  }
  // 退出登录
  exitHandler () {
    sessionStorage.setItem('username', '')
    this.context.router.history.push({
      pathname: '/',
      params: {
        id: 222233333
      }
    })
    window.location.reload(true)
  }
  // 菜单
  menu () {
    return (
      <Menu className="username_nav">
    <Menu.Item>
      <Link to={{pathname: '/my', params: {}, query: {}}}><i className="iconfont icon-yonghu"></i>我的主页</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={{pathname: '/my', params: {}, query: {}}}><i className="iconfont icon-biaoqian"></i>收藏的文章</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={{pathname: '/my', params: {}, query: {}}}><i className="iconfont icon-xin_"></i>喜欢的文章</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={{pathname: '/my', params: {}, query: {}}}><i className="iconfont icon-zuanshi"></i>已购内容</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={{pathname: '/my', params: {}, query: {}}}><i className="iconfont icon-qianbao2"></i>我的钱包</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={{pathname: '/my', params: {}, query: {}}}><i className="iconfont icon-shezhi"></i>设置</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={{pathname: '/my', params: {}, query: {}}}><i className="iconfont icon-duanxin"></i>帮助与反馈</Link>
    </Menu.Item>
    <Menu.Item>
      <a onClick={this.exitHandler.bind(this)}><i className="iconfont icon-tuichu"></i>退出</a>
    </Menu.Item>
  </Menu>
    )
  }
  // setContentHtml () {
  //   return (
  //     <div className="set_cont">
  //       <div>
  //         <Button className={this.state.isNight ? 'title_button title_turn_on title_button_active' : 'title_button title_turn_on'} onClick={this.toggleModel.bind(this, 'night')}>开</Button>
  //         <Button className={this.state.isNight ? 'title_button title_turn_on title_button_active' : 'title_button title_turn_on'} onClick={this.toggleModel.bind(this, 'night')}>开</Button>
  //       </div>
  //       <div>
  //         <Button className={this.state.isNight ? 'title_button title_turn_on title_button_active' : 'title_button title_turn_on'} onClick={this.toggleModel.bind(this, 'night')}>开</Button>
  //         <Button className={this.state.isNight ? 'title_button title_turn_on title_button_active' : 'title_button title_turn_on'} onClick={this.toggleModel.bind(this, 'night')}>开</Button>
  //       </div>
  //     </div>
  //   )
  // }
  add () {
    // let count = this.state.count
    // console.log(++this.state.count)
    console.log(++this.state.count)
    // console.log(11111111111)
    // count++
    // this.setState({
    //   count: ++this.state.count
    // })
  }
  shouldComponentUpdate (nextState, nextProps) {
    console.log('nextProps', nextProps)
    console.log('nextState', nextState)
    console.log('this.props', this.props)
    console.log('this.state', this.state)
    return true
  }
  render () {
    // console.log(1111111111111111)
    const username = sessionStorage.getItem('username')
    const { currentSpan, isFocus, count } = this.state
    console.log('this.context', this.context)
    return (
      <div className="head">
        <div className="head_cont">
          <Link to={{pathname: '/', params: {}, query: {}}} className="head_logo">墨书</Link>
          {/* <a href="/my" onClick={e => {e.preventDefault()}}>百度</a> */}
          {/* <span>{count}</span> */}
          {/* <button onClick={() => this.state.count++}>按钮1</button> */}
          {/* <button onClick={() => this.add()}>按钮2</button> */}
          <div className="head_center">
            { !username && <span className={currentSpan === 'home' ? 'active_span' : ''} onClick={this.changeCurrentSpan.bind(this, 'home')}><i className="iconfont icon-shouye"></i> 首页</span> }
            { !username && <span className={currentSpan === 'donwload' ? 'active_span' : ''} onClick={this.changeCurrentSpan.bind(this, 'donwload')}><i className="iconfont icon-shoujixiazai"></i> 下载App</span> }
            { username && <span className={currentSpan === 'discover' ? 'active_span' : ''} onClick={this.changeCurrentSpan.bind(this, 'discover')}><i className="iconfont icon-faxian"></i> 发现</span> }
            { username && <span className={currentSpan === 'follow' ? 'active_span' : ''} onClick={this.changeCurrentSpan.bind(this, 'follow')}><i className="iconfont icon-xin_"></i> 关注</span> }
            { username && <span className={currentSpan === 'news' ? 'active_span' : ''} onClick={this.changeCurrentSpan.bind(this, 'news')}><i className="iconfont icon-xiaoxi"></i> 消息</span> }
            <Search className={!isFocus ? 'input_search' : 'input_search input_search_focused'} onFocus={this.focusHandler.bind(this)} onBlur={this.blurHandler.bind(this)} placeholder="搜索"/>
          </div>
          <div className="head_set">
            <Popover overlayClassName="sytle_popover" placement="bottomRight" title={this.setTitleHtml()} trigger="click">
              <span className="head_style">Aa</span>
            </Popover>
            { !username && <span className="head_login" onClick={this.loginHandler.bind(this)}>登录</span> }
            { !username && <span className="head_register" onClick={this.registerHandler.bind(this)}>注册</span> }
            { username && <Dropdown overlay={this.menu()} placement="bottomCenter">
              <span className="head_protrait">
                <img src={headProtrait} alt=""/><i className="iconfont icon-arrLeft-fill"></i>
              </span>
            </Dropdown> }
            <span className="head_write" onClick={this.jumpWriting.bind(this)}><i className="iconfont icon-bi-copy"> </i>写文章</span>
          </div>
        </div>
      </div>
    )
  }
  componentDidUpdate () {
    console.log('componentDidUpdate')
  }
}