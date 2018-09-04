import React, { Component } from 'react'
import './home.scss'
import Head from '@/components/Head/Head'

export default class Home extends Component {
  constructor () {
    super()
  }
  render () {
    return (
      <div className="home">
        <Head></Head>
      </div>
    )
  }
}