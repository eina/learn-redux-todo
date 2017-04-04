//Simple redux app

import Redux, { createStore, compose } from 'redux';

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

var store = createStore(reducer, compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

//subscribe to changes
var unsubscribe = store.subscribe(()=> {
  var state = store.getState();

  console.log('name is', state.name);
});

//unsubscribe from store.subscribe()
// unsubscribe();

//gets our current object
var currentState = store.getState();
console.log('currentState', currentState);

var action = {
  type: 'CHANGE_NAME',
  name: 'Andrew'
}

//dispatch your action
store.dispatch(action);



store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Emily'
});