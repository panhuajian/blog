import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Search from './search/search'
import { Popover, Button, Menu, Dropdown } from 'antd'
import './index.scss'
import headProtrait from '@/assets/img/head_protrait.jpg'

// const Search = Input.Search

const menu = (
  <Menu className="username_nav">
    <Menu.Item>
      <a><i className="iconfont icon-yonghu"></i>我的主页</a>
    </Menu.Item>
    <Menu.Item>
      <a><i className="iconfont icon-biaoqian"></i>收藏的文章</a>
    </Menu.Item>
    <Menu.Item>
      <a><i className="iconfont icon-xin_"></i>喜欢的文章</a>
    </Menu.Item>
    <Menu.Item>
      <a><i className="iconfont icon-zuanshi"></i>已购内容</a>
    </Menu.Item>
    <Menu.Item>
      <a><i className="iconfont icon-qianbao2"></i>我的钱包</a>
    </Menu.Item>
    <Menu.Item>
      <a><i className="iconfont icon-shezhi"></i>设置</a>
    </Menu.Item>
    <Menu.Item>
      <a><i className="iconfont icon-duanxin"></i>帮助与反馈</a>
    </Menu.Item>
    <Menu.Item>
      <a><i className="iconfont icon-tuichu"></i>退出</a>
    </Menu.Item>
  </Menu>
)

export default class Head extends Component {
  constructor() {
    super()
    this.state = {
      isHome: true,
      isFocus: false,
      isNight: false,
      isShowPopover: false,
      currentSpan: sessionStorage.getItem('username') ? 'discover' : 'home',
      searchContent: ""
    }
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  changeCurrentSpan(type) {
    this.setState({
      currentSpan: type
    })
  }
  focusHandler() {
    this.setState({
      isFocus: true
    })
  }
  blurHandler() {
    this.setState({
      isFocus: false
    })
  }
  toggleModel(type) {
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
  togglePopover() {
    this.setState({
      isShowPopover: !this.state.isShowPopover
    })
  }
  setTitleHtml() {
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
  jumpWriting() {
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
  registerHandler() {
    this.context.router.history.push({
      pathname: '/register'
    })
    this.props.registerActions.setRegisterType('register')
  }
  loginHandler() {
    this.context.router.history.push({
      pathname: '/register'
    })
    this.props.registerActions.setRegisterType('login')
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
  render() {
    // console.log(1111111111111111)
    const username = sessionStorage.getItem('username')
    const { currentSpan } = this.state
    // console.log('this.context', this.context)
    return (
      <div className="head">
        <div className="head_cont">
          <div className="head_logo">墨痕</div>
          <div className="head_center">
            {!username && <span className={currentSpan === 'home' ? 'active_span' : ''} onClick={this.changeCurrentSpan.bind(this, 'home')}><i className="iconfont icon-shouye"></i> 首页</span>}
            {!username && <span className={currentSpan === 'donwload' ? 'active_span' : ''} onClick={this.changeCurrentSpan.bind(this, 'donwload')}><i className="iconfont icon-shoujixiazai"></i> 下载App</span>}
            {username && <span className={currentSpan === 'discover' ? 'active_span' : ''} onClick={this.changeCurrentSpan.bind(this, 'discover')}><i className="iconfont icon-faxian"></i> 发现</span>}
            {username && <span className={currentSpan === 'follow' ? 'active_span' : ''} onClick={this.changeCurrentSpan.bind(this, 'follow')}><i className="iconfont icon-xin_"></i> 关注</span>}
            {username && <span className={currentSpan === 'news' ? 'active_span' : ''} onClick={this.changeCurrentSpan.bind(this, 'news')}><i className="iconfont icon-xiaoxi"></i> 消息</span>}
            <Search />
          </div>
          <div className="head_set">
            <Popover overlayClassName="sytle_popover" placement="bottomRight" title={this.setTitleHtml()} trigger="click">
              <span className="head_style">Aa</span>
            </Popover>
            {!username && <span className="head_login" onClick={this.loginHandler.bind(this)}>登录</span>}
            {!username && <span className="head_register" onClick={this.registerHandler.bind(this)}>注册</span>}
            {username && <Dropdown overlay={menu} placement="bottomCenter">
              <span className="head_protrait">
                <img src={headProtrait} alt="" /><i className="iconfont icon-arrLeft-fill"></i>
              </span>
            </Dropdown>}
            <span className="head_write" onClick={this.jumpWriting.bind(this)}><i className="iconfont icon-bi-copy"> </i>写文章</span>
          </div>
        </div>
      </div>
    )
  }
}