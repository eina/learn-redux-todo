//Simple redux app

import { createStore, compose, combineReducers } from 'redux';
import axios from 'axios';

console.log('starting redux example');

var stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
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

/*
 * ----------------------
 * Map reducers and generators
 * Async actions
 * ----------------------
 */

var mapReducer = (state = {isFetching: false, url: undefined}, action) => {
  switch(action.type){
    case "START_LOCATION_FETCH":
      return {
          isFetching: true,
          url: undefined
        };
    case "COMPLETE_LOCATION_FETCH":
      // fire when the data is fetched
      return {
        isFetching: false,
        url: action.url
      };
    default:
      return state;
  }
}

var startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  }
}

var completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  }
}

var fetchLocation = () => {
  //start location fetch by dispatching this action
  //you can load a spinning loading wheel or something
  store.dispatch(startLocationFetch())

  //grab data
  axios.get('https://ipinfo.io/json/').then(function(res) {
    var loc = res.data.loc;
    var baseUrl = 'http://maps.google.com?q=' ;

    //dispatch the action to fetch the data
    store.dispatch(completeLocationFetch(baseUrl + loc));
  })
};

//reducer composition
var reducer = combineReducers({
  //name state is goign to get managed by nameReducer
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: movieReducer,
  map: mapReducer
})

var store = createStore(reducer, compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

//subscribe to changes
var unsubscribe = store.subscribe(()=> {
  var state = store.getState();

  console.log('name is', state.name);
  console.log('new state', state);

  if(state.map.isFetching) {
    document.getElementById('root').innerHTML = 'loading'
  } else if(state.map.url){
    console.log(state.map.url);
  }
});

//unsubscribe from store.subscribe()
// unsubscribe();

//gets our current object
var currentState = store.getState();
console.log('currentState', currentState);

//fetch data
fetchLocation();

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



