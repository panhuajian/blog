import React, { Component } from 'react'
import * as registerActions from '@/actions/register'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from '@/axios'
import './index.scss'
import utils from '@/utils'
import { Tooltip } from 'antd'

class Register extends Component {
  constructor (props) {
    super(props)
    console.log('1111111111', this)
    this.state = {
      errorTips: '',
      checkType: ''
    }
  }
  toggleType (type) {
    this.props.registerActions.setRegisterType(type)
  }
  async registerCheck (type, e) {
    let val = e.target.value
    let errorTips = await utils.registerCheck(type, val)
    debugger
    if (errorTips) {
      this.setState({
        errorTips,
        checkType: type
      })
    } else {
      this.setState({
        errorTips: '',
        checkType: type
      })
    }
  }
  registerHandler () {
    debugger
    const { errorTips } = this.state
    const username = this.refs.username.value
    const password = this.refs.password.value
    // console.log()
    if (username && password && !errorTips) {
      let data = {
        type: 1,
        username,
        password
      }
      axios.axiosPost(utils.requestAddr, data, res => {
        
      })
    }
  }
  render () {
    // debugger
    // console.log(this)
    const { errorTips, checkType } = this.state
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
            <Tooltip placement="right" title={errorTips} visible={errorTips && checkType === 'username' ? true : false}>
              <div><i className="iconfont icon-yonghu"></i><input className="username_info" type="text" placeholder="你的用户名" ref="username"  onBlur={this.registerCheck.bind(this, 'username')}/></div>
            </Tooltip>
            {false && <div><i className="iconfont icon-shouji"></i><input className="username_info" type="text" placeholder="手机号"/></div>}
            {false && <div><i className="iconfont icon-gouSolid"></i><input className="username_info" type="text" placeholder="手机验证码"/></div>}
            <Tooltip placement="right" title={errorTips} visible={errorTips && checkType === 'password' ? true : false}>
              <div><i className="iconfont icon-mima"></i><input className="username_info" type="text" placeholder="设置密码" ref="password" onBlur={this.registerCheck.bind(this, 'password')}/></div>
            </Tooltip>
            {registerType === 'login' && <div className="remember_me">
              <label htmlFor=""><input type="checkbox"/> 记住我</label>
              <span>登录遇到问题？</span>
            </div>}
            <a onClick={this.registerHandler.bind(this)}>注册</a>
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