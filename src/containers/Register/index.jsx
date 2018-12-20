import React, { Component } from 'react'
import * as registerActions from '@/actions/register'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import './index.scss'
import utils from '@/utils'
import { Tooltip, message } from 'antd'

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errorUsernameTips: '',
      errorPasswordTips: ''
    }
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  toggleType (type) {
    this.props.registerActions.setRegisterType(type)
  }
  // 检查用户注册信息
  async registerCheck (type, e) {
    // debugger
    let val = e.target.value
    let errorTips = await utils.registerCheck(type, val)
    // debugger
    switch (type) {
      case 'username':
        this.setState({
          errorUsernameTips: errorTips
        })
        break
      case 'password':
        this.setState({
          errorPasswordTips: errorTips
        })
        break
      default:
    }
  }
  registerHandler () {
    const { errorUsernameTips, errorPasswordTips } = this.state
    const username = this.refs.username.value
    const password = this.refs.password.value
    // console.log()
    if (username && password && !errorUsernameTips && !errorPasswordTips) {
      let data = {
        type: 1,
        username,
        password
      }
      axios.post(utils.requestAddr.register, data).then(res => {
        if (res.data.status === 1) {
          this.context.router.history.push({
            pathname: '/'
          })
        }
      })
    }
  }
  async loginHandler () {
    const username = this.refs.username.value
    const password = this.refs.password.value
    let data = {
      type: 2,
      username,
      password
    }
    const result = await axios.post(utils.requestAddr.register, data)
    // debugger
    if (result.data.status === 1) {
      sessionStorage.setItem('username', username)
      this.context.router.history.push({
        pathname: '/'
      })
    } else {
     (() => {
      message.error('用户名或密码错误，请重新输入！')
     })()
    }
  }
  keyUpHandler (e, type) {
    const { registerType } = this.props
    if (e.keyCode === 13) {
      if (registerType === 'login') {
        this.loginHandler()
      } else {
        this.registerHandler()
      }
    }
  }
  render () {
    // debugger
    // console.log(this)
    const { errorUsernameTips, errorPasswordTips } = this.state
    const { registerType } = this.props
    // debugger
    return (
      <div className="register">
        <div className="cont">
          <div className="cont_title">
            <a onClick={this.toggleType.bind(this, 'login')} className={registerType === 'login' ? 'cont_login active_a' : 'cont_login'}>登录</a>
            <span>·</span>
            <a onClick={this.toggleType.bind(this, 'register')} className={registerType === 'register' ? 'cont_register active_a' : 'cont_register'}>注册</a>
          </div>
          <div className="cont_info">
            <Tooltip placement="right" title={errorUsernameTips} visible={errorUsernameTips ? true : false}>
              <div><i className="iconfont icon-yonghu"></i><input className="username_info" type="text" placeholder="用户名" ref="username" onKeyUp={this.keyUpHandler.bind(this)} onBlur={registerType === 'register' ? this.registerCheck.bind(this, 'username') : null}/></div>
            </Tooltip>
            {false && <div><i className="iconfont icon-shouji"></i><input className="username_info" type="text" placeholder="手机号"/></div>}
            {false && <div><i className="iconfont icon-gouSolid"></i><input className="username_info" type="text" placeholder="手机验证码"/></div>}
            <Tooltip placement="right" title={errorPasswordTips} visible={errorPasswordTips ? true : false}>
              <div><i className="iconfont icon-mima"></i><input className="username_info" type="password" placeholder={registerType === 'login' ? '密码' : '设置密码'} ref="password" onKeyUp={this.keyUpHandler.bind(this)} onBlur={registerType === 'register' ? this.registerCheck.bind(this, 'password') : null}/></div>
            </Tooltip>
            {registerType === 'login' && <div className="remember_me">
              <label htmlFor=""><input type="checkbox"/> 记住我</label>
              <span>登录遇到问题？</span>
            </div>}
            <a onClick={registerType === 'login' ? this.loginHandler.bind(this) : this.registerHandler.bind(this)}>{registerType === 'login' ? '登录' : '注册'}</a>
            <p>点击 “注册” 即表示您同意并愿意遵守墨痕</p>
            <p><a>用户协议</a> 和 <a>隐私政策。</a></p>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  // debugger
  return {
    registerType: state.register.registerType
  }
}
const mapActionsToProps = dispatch => {
  return {
    registerActions: bindActionCreators(registerActions, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Register)