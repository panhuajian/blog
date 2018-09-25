// import * as actionTypes from '../constants/number.js'
import initState from '@/store/initState.js'
import { combineReducers } from 'redux'

const registerType = (state = initState.registerType, action) => {
    switch(action.type) {
        case 'SET_REGISTER_TYPE':
            return action.data
        default:
            return state
    }
}

export default combineReducers({
  registerType
})