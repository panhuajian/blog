import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Input, Popover, Button } from 'antd'
import './index.scss'

const Search = Input.Search

export default class Head extends Component {
  constructor () {
    super()
    this.state = {
      isHome: true,
      isFocus: false,
      isNight: false,
      isShowPopover: false
    }
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  changeIsHome () {
    this.setState({
      isHome: !this.state.isHome
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
    this.context.router.history.push({
      pathname: '/writing',
      params: {
        id: 222233333
      }
    })
  }
  registerHandler () {
    this.context.router.history.push({
      pathname: '/register',
      params: {
        type: 'register'
      }
    })
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
  render () {
    const { isHome, isFocus } = this.state
    console.log('this.context', this.context)
    return (
      <div className="head">
        <div className="head_cont">
          <div className="head_logo">墨痕</div>
          <div className="head_center">
            <span className={isHome ? 'active_span' : ''} onClick={this.changeIsHome.bind(this)}><i className="iconfont icon-shouye"></i> 首页</span>
            <span className={!isHome ? 'active_span' : ''} onClick={this.changeIsHome.bind(this)}><i className="iconfont icon-shoujixiazai"></i> 下载App</span>
            <Search className={!isFocus ? 'input_search' : 'input_search input_search_focused'} onFocus={this.focusHandler.bind(this)} onBlur={this.blurHandler.bind(this)} placeholder="搜索"/>
          </div>
          <div className="head_set">
            <Popover overlayClassName="sytle_popover" placement="bottomRight" title={this.setTitleHtml()} trigger="click">
              <span className="head_style">Aa</span>
            </Popover>
            <span className="head_login">登录</span>
            <span className="head_register" onClick={this.registerHandler.bind(this)}>注册</span>
            <span className="head_write" onClick={this.jumpWriting.bind(this)}><i className="iconfont icon-bi-copy"> </i>写文章</span>
          </div>
        </div>
      </div>
    )
  }
}