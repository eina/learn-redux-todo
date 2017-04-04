import redux, { createStore } from 'redux';

console.log('starting todo redux example');

var stateDefault = {
  searchText: '',
  showCompleted: false,
  todos: []
};

var reducer = (state = stateDefault, action) => {
  switch(action.type){
    case 'CHANGE_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.searchText
      }
    default:
      return state;
  }
}

var store = createStore(reducer);

//console.log the results 
console.log('currentState', store.getState());

var changeSearchText = {
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'penguins'
}

//dispatch the action

store.dispatch(changeSearchText);

console.log('search text should be penguins', store.getState())