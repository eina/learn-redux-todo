import redux from 'redux';
import { nameReducer, mapReducer, hobbiesReducer, movieReducer} from './../reducers/index'

export const configure = () => {
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

  return store;
}

