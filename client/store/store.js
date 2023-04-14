import { createStore, applyMiddleware } from 'redux';
import thunks from 'redux-thunk';
import loggingMiddleware from 'redux-logger';
import reducer from './reducers/reducer.js';

//const store = createStore(reducer, applyMiddleware(thunks, loggingMiddleware));

// const store = createStore(reducer, applyMiddleware(thunks, loggingMiddleware));

const store = createStore(reducer, applyMiddleware(thunks));
// createStore expects one argument which is the reducer.

export default store;
