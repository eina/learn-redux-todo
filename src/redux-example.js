//Simple redux app

import Redux, { createStore } from 'redux';

console.log('starting redux example');

var reducer = (state = {name: 'Anonymous'}, action) => {
  return state;
}

var store = createStore(reducer);

//gets our current object
var currentState = store.getState();

console.log('currentState', currentState);