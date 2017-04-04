//Simple redux app

import Redux, { createStore } from 'redux';

console.log('starting redux example');

var reducer = (state = {name: 'Anonymous'}, action) => {
  switch(action.type){
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      } 
    default:
      return state
  }
}

var store = createStore(reducer);

//gets our current object
var currentState = store.getState();
console.log('currentState', currentState);

var action = {
  type: 'CHANGE_NAME',
  name: 'Andrew'
}

//dispatch your action
store.dispatch(action);

console.log('Name should be andrew', store.getState())