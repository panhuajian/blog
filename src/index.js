import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import configStore from '@/store'
// import registerServiceWorker from './registerServiceWorker';

const store = configStore()

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, 
  document.getElementById('root'));
// registerServiceWorker();
