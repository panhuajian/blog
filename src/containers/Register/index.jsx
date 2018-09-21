import React, { Component } from 'react'
import './index.scss'

export default class Register extends Component {
  render () {
    debugger
    console.log(this)
    return (
      <div className="register">
        <div className="cont">
          <div className="cont_title">
            <a className="cont_login">登录</a>
            <span>·</span>
            <a className="cont_register active_a">注册</a>
          </div>
          <div className="cont_info">
            <div><i className="iconfont icon-yonghu"></i><input type="text" placeholder="你的昵称"/></div>
            <div><i className="iconfont icon-shouji"></i><input type="text" placeholder="手机号"/></div>
            <div><i className="iconfont icon-gouSolid"></i><input type="text" placeholder="手机验证码"/></div>
            <div><i className="iconfont icon-mima"></i><input type="text" placeholder="设置密码"/></div>
            <a>注册</a>
            <p>点击 “注册” 即表示您同意并愿意遵守墨痕</p>
            <p><a>用户协议</a> 和 <a>隐私政策。</a></p>
          </div>
        </div>
      </div>
    )
  }
}