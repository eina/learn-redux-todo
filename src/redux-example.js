//Simple redux app

import Redux, { createStore, compose } from 'redux';

console.log('starting redux example');

var stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
}

var nextHobbyId = 1;
var nextMovieId = 1;

var reducer = (state = stateDefault, action) => {
  switch(action.type){
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      } 
    case 'ADD_HOBBY':
      return {
        ...state,
        hobbies: [
          //call existing hobbies
          ...state.hobbies,
          //add new hobby
          {
            id: nextHobbyId++,
            hobby: action.hobby
          }
        ]
      }
    case 'REMOVE_HOBBY':
      return {
        ...state,
        //filter returns a new array
        hobbies: state.hobbies.filter((hobby) => {
          return hobby.id !== action.id
        })
      }
    case 'ADD_MOVIE':
      return {
        ...state,
        movies: [
          ...state.movies,
          {
            id: nextMovieId++,
            title: action.title,
            genre: action.genre
          }
        ]
      }
    case 'REMOVE_MOVIE':
      return {
        ...state,
        movies: state.movies.filter((movie) => {
          return movie.id !== action.id
        })
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
  console.log('new state', state);
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
  type: 'ADD_HOBBY',
  hobby: 'Running'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Knitting'
});

store.dispatch({
  type: 'REMOVE_HOBBY',
  id: 2
})

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Emily'
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Get Out',
  genre: 'Horror'
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Power Rangers',
  genre: 'Adaptation'
});

store.dispatch({
  type: 'REMOVE_MOVIE',
  id: 2
});



