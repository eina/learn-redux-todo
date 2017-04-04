//Simple redux app

import Redux, { createStore, compose, combineReducers } from 'redux';

console.log('starting redux example');

var stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
}

var oldReducer = (state = stateDefault, action) => {
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

/*
 * ----------------------
 * Name reducers and action generators
 * ----------------------
 */

var nameReducer = (state = 'Anonymous', action) => {
  switch(action.type){
    case 'CHANGE_NAME':
      //state is no longer an object so you only return the changes
      return action.name
    default: 
      return state;
  }
}

//best for http calls/database requests
var changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name
    //name: name
  }
}

/*
 * ----------------------
 * Hobbies reducers and action generators
 * ----------------------
 */

var nextHobbyId = 1;
var hobbiesReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_HOBBY':
      return [
        ...state,
        {
          id: nextHobbyId++,
          hobby: action.hobby
        }
      ];
    case 'REMOVE_HOBBY':
      //filter will return a new array
      return state.filter((hobby) => { hobby.id !== action.id})
    default: 
      return state;
  }
}

var addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    id: nextHobbyId++,
    hobby
  }
}

var removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }
}

/*
 * ----------------------
 * Movie reducers and generators
 * ----------------------
 */

var nextMovieId = 1;
var movieReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_MOVIE':
      return [
        ...state,
        {
          id: nextMovieId++,
          title: action.title,
          genre: action.genre
        }
      ]
    case 'REMOVE_MOVIE':
      return state.filter((movie) => { movie.id !== action.id })
    default: 
      return state;
  }
}

var addMovie = (title, genre) => {
  return {
    type: 'ADD_MOVIE',
    title,
    genre,
  }
}

var removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  }
}

//reducer composition
var reducer = combineReducers({
  //name state is goign to get managed by nameReducer
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: movieReducer
})

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


//dispatch your action
store.dispatch(changeName('Andrew'));

store.dispatch(addHobby('Running'));

store.dispatch(addHobby('Knitting'));

store.dispatch(removeHobby(2));

store.dispatch(addMovie('Beauty and the Beast', 'Adaptation'))

store.dispatch(removeMovie(1))

store.dispatch(changeName('Emily'));

store.dispatch(changeName('Snorkeling'));

store.dispatch(addMovie('Get Out', 'Horror'))

store.dispatch(addMovie('Power Rangers', 'Adaptation'))

store.dispatch(removeMovie(1))



