import React, { Component } from 'react'
import * as numberActions from '@/actions/number.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from '@/axios'
import utils from '@/utils'

class Article extends Component {
  constructor () {
    super()
    this.state = {
      init: 11
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
  // debugger
  return {
    count: state.number.count
  }
}
const mapActionsToProps = dispatch => {
  return {
    numberActions: bindActionCreators(numberActions, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Article)