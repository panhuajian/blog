import React, { Component } from 'react'
import './index.scss'
import Head from '@/components/Head'
import ContRight from '@/components/Home/ContRight'

export default class Home extends Component {
  render () {
    return (
      <div className="home">
        <Head></Head>
        <div className="blog_cont">
          <ContRight></ContRight>
        </div>
      </div>
    )
  }
}