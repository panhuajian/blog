import React, { Component } from 'react'
import * as registerActions from '@/actions/register'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './index.scss'
import Head from '@/components/Head'
import ContRight from '@/components/Home/ContRight'
import ContLeft from '@/components/Home/ContLeft'
class Home extends Component {
  render () {
    const { registerActions } = this.props
    return (
      <div className="home">
        <Head registerActions={registerActions}></Head>
        <div className="blog_cont">
          <ContRight></ContRight>
          <ContLeft></ContLeft>
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