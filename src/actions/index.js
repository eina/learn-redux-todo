//best for http calls/database requests
export var changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name
    //name: name
  }
}


export var addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    id: nextHobbyId++,
    hobby
  }
}

export var removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }
}


export var addMovie = (title, genre) => {
  return {
    type: 'ADD_MOVIE',
    title,
    genre,
  }
}

export var removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  }
}



export var startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  }
}

export var completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  }
}

export var fetchLocation = () => {
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