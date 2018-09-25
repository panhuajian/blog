import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from '@/store'
// import registerServiceWorker from './registerServiceWorker';

// const { persistor, store } = configureStore()


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, 
  document.getElementById('root'));
// registerServiceWorker();
