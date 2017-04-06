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