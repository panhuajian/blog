import axios from 'axios'
import _ from 'lodash'

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:9999/api' : 'http://panhuajian.com:3000/api'

export default {
  // 线上接口
  // requestAddr: 'http://panhuajian.com:3000/api/register',
  // requestAddr: {
  //   register: 'http://panhuajian.com:3000/api/register',
  //   article: 'http://panhuajian.com:3000/api/article'
  // },
  // 本地接口
  requestAddr: {
    register: `${baseUrl}/register`,
    article: `${baseUrl}/article`,
    upload: `${baseUrl}/upload`,
    trendingSearch: `${baseUrl}/trending_search`
  },
  async registerCheck(type, val) {
    // debugger
    switch (type) {
      case 'username':
        if (val === '') {
          return ''
        } else if (val.length < 2 || val.length > 20) {
          return '用户名长度需要在2-15个字符之间！'
        }
        const data = {
          type: 0,
          username: val
        }
        let result = await axios.post(this.requestAddr, data)
        // debugger
        if (result.data.status === 0) {
          return '用户名已存在！'
        } else {
          return ''
        }
      case 'password':
        if (val === '') {
          return ''
        } else if (val.length < 6 || val.length > 20) {
          return '密码长度需要在6-50个字符之间！'
        } else {
          return ''
        }
      default:
        // debugger
    }
  }
}

/**
 *  从localstorage里取出内存 key
 */

export let compose = _.flowRight
export let map = _.curry((f, arr) => arr.map(f))
export let slice = _.curry((arg, arr) => _.isArray(arg) ? arr.slice(...arg) : arr.slice(arg))
let IO = function (f) {
  this.__value = f
}
IO.of = x => new IO(_ => x)

IO.prototype.map = function (f) {
  return new IO(compose(f, this.__value))
}
IO.prototype.join = function () {
  return this.__value ? IO.of(null) : this.__value()
}

const localStorage = new IO(_ => window.localStorage)

let getItem = _.curry((key, arr) => arr.getItem(key))

let setItem = _.curry((key, value, arr) => arr.setItem(key, value))

// 封装两个方法


export let localData = {
  getLocalData: key => map(getItem(key), localStorage).__value(),
  setLocalData: (key, val) => map(setItem(key, val), localStorage).__value()
}