import React, { Component } from 'react'
import * as registerActions from '@/actions/register'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './index.scss'
import Head from '@/components/Head'
import ContRight from '@/components/Home/ContRight'
import ContLeft from '@/components/Home/ContLeft'
class Home extends Component {
  constructor () {
    super()
    this.state = {
      count: 1
    }
  }
  add () {
    let count = this.state.count
    count++
    this.setState({
      count
    })
  }
  render () {
    const { registerActions } = this.props
    const { count } = this.state
    return (
      <div className="home">
        <Head registerActions={registerActions}></Head>
        <div>{count}</div>
        <div>
          <button onClick={this.add.bind(this)}>add</button>
        </div>
        <div className="blog_cont">
          <ContLeft></ContLeft>
          <ContRight></ContRight>
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
)(Home)