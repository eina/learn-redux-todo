//Simple redux app

import { createStore, compose, combineReducers } from 'redux';
import axios from 'axios';

//load redux stuff 
import actions from './actions/index';
import store from './actions/configStore'

console.log('starting redux example');

var stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
}

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



