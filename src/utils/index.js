import axios from 'axios'
export default {
  // 线上接口
  // requestAddr: 'http://panhuajian.com:3000/api/register',
  // requestAddr: {
  //   register: 'http://panhuajian.com:3000/api/register',
  //   article: 'http://panhuajian.com:3000/api/article'
  // },
  // 本地接口
  requestAddr: {
    register: 'http://localhost:9999/api/register',
    article: 'http://localhost:9999/api/article'
  },
  async registerCheck (type, val) {
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