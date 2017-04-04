import redux, { createStore } from 'redux';

console.log('starting todo redux example');

var stateDefault = {
  searchText: '',
  showCompleted: false,
  todos: []
};

var reducer = (state = stateDefault, action) => {
  return state;
}

var store = createStore(reducer);

//console.log the results 
console.log('currentState', store.getState());