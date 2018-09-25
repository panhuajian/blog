import { createStore } from 'redux'
import reducers from '@/reducers'
// import {persistStore, persistCombineReducers} from 'redux-persist'
// import storage from 'redux-persist/es/storage'
// const { persistStore, autoRehydrate } = import('redux-persist');
import { persistStore, autoRehydrate } from 'redux-persist'
import { asyncSessionStorage } from 'redux-persist/storages'
const store = createStore(reducers, autoRehydrate())

persistStore(store, {storage: asyncSessionStorage})
export default store