export var nameReducer = (state = 'Anonymous', action) => {
  switch(action.type){
    case 'CHANGE_NAME':
      //state is no longer an object so you only return the changes
      return action.name
    default: 
      return state;
  }
}

var nextHobbyId = 1;
export var hobbiesReducer = (state = [], action) => {
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

export var nextMovieId = 1;
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

export var mapReducer = (state = {isFetching: false, url: undefined}, action) => {
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