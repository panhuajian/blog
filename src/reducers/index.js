import { combineReducers } from 'redux'
import number from './number.js'
import register from './register'

export default combineReducers({
  number,
  register
})