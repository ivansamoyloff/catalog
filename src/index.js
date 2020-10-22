import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import {  applyMiddleware, createStore  } from "redux";
import {  Provider  } from 'react-redux'
import reducer from "./services/reducer";
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk));


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);
