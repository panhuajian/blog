// import * as actionTypes from '../constants/other.js'
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

const articleId = (state = initState.articleId, action) => {
    switch(action.type) {
        case 'SET_ARTICLE_ID':
            return action.data
        default:
            return state
    }
}

export default combineReducers({
    count,
    articleId
})