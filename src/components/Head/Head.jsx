import React, { Component } from 'react'
import { Input, Popover, Button } from 'antd'
import './head.scss'

const Search = Input.Search

export default class Head extends Component {
  constructor () {
    super()
    this.state = {
      isHome: true,
      isFocus: false,
      isTurnOn: false
    }
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
  toggleSwitch () {
    this.setState({
      isTurnOn: !this.state.isTurnOn
    })
  }
  setTitleHtml () {
    return (
      <div className="set_title">
        <i className="iconfont icon-gray-moon"> 夜间模式</i>
        <Button className={this.state.isTurnOn ? 'title_button title_turn_on title_button_active' : 'title_button title_turn_on'}>开</Button>
        <Button className={!this.state.isTurnOn ? 'title_button title_turn_off title_button_active' : 'title_button title_turn_off'}>关</Button>
      </div>
    )
  }
  render () {
    const { isHome, isFocus } = this.state
    return (
      <div className="head">
        <div className="head_cont">
          <div className="head_logo">墨痕</div>
          <div className="head_center">
            <i className={isHome ? 'iconfont icon-shouye active_i' : 'iconfont icon-shouye'} onClick={this.changeIsHome.bind(this)}> 首页</i>
            <i className={!isHome ? 'iconfont icon-shoujixiazai active_i' : 'iconfont icon-shoujixiazai'} onClick={this.changeIsHome.bind(this)}> 下载App</i>
            <Search className={!isFocus ? 'input_search' : 'input_search input_search_focused'} onFocus={this.focusHandler.bind(this)} onBlur={this.blurHandler.bind(this)} placeholder="搜索"/>
          </div>
          <div className="head_set">
            <Popover placement="bottomRight" title={this.setTitleHtml()} trigger="click">
              <span className="head_style">Aa</span>
            </Popover>
            <span className="head_login">登录</span>
            <span className="head_register">注册</span>
            <span className="head_write"><i className="iconfont icon-bi-copy"> </i>写文章</span>
          </div>
        </div>
      </div>
    )
  }
}