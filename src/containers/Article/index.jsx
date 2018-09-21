import React, { Component } from 'react'
import * as handlerNumberActions from '@/actions/number.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from '@/axios'

class Article extends Component {
  constructor () {
    super()
    this.state = {
      init: 11
    }
    // this.numberAdd = this.numberAdd.bind(this)
  }
  numberAdd () {
    debugger
    let _this = this
    console.log('this', this)
    console.log('_this', _this)
    console.log('------------', this.state)
    let count = this.props.count
    count++
    this.props.handlerNumberActions.changeCount(count)
  }
  numberSubtract () {
    let count = this.props.count
    count--
    this.props.handlerNumberActions.changeCount(count)
  }
  getData () {
    let data = {
      username: 'test4',
      password: '123456' 
    }
    axios.axiosPost('http://panhuajian.com:3000/api/register', data, res => {
      debugger
      console.log(res)
    })
  }
  render () {
    console.log('+++++++++++', this.props)
    return (
      <div>
        <p>{this.props.count}</p>
        <button onClick={this.numberAdd.bind(this)}>+</button>
        ------------------
        <button onClick={this.numberSubtract.bind(this)}>-</button>
        <div>
          <button  onClick={this.getData.bind(this)}>请求数据</button>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    count: state.number.count
  }
}
const mapActionsToProps = dispatch => {
  return {
    handlerNumberActions: bindActionCreators(handlerNumberActions, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Article)