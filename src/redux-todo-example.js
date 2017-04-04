import redux, { createStore, compose } from 'redux';

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

//enable redux dev tools
var store = createStore(reducer, compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

//console.log the results 
console.log('currentState', store.getState());

//subscribe to changes
var unsubscribe = store.subscribe(() =>{
  var state = store.getState();

  document.getElementById('root').innerHTML = state.searchText;
})

var changeSearchText = {
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'penguins'
}

//dispatch the action

store.dispatch(changeSearchText);

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'work'
});

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'handlettering'
});

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'freelance'
});


console.log('search text should be penguins', store.getState())