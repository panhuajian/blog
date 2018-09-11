// import * as actionTypes from '../constants/number.js'
import initState from '@/store/initState.js'
import { combineReducers } from 'redux'

const count = (state = initState.count, action) => {
    switch(action.type) {
        case 'CHANGE_COUNT':
            return action.data
        default:
            return state
    }
}

export default combineReducers({
    count
})