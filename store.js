function createStore(reducer) {
  let currentState = reducer(undefined, {})

  return {
    getState: () => currentState,
    dispatch: action => {
      currentState = reducer(currentState, action)
    }
  }
}

const initialState = {
  favourites: []
}

function favouritesReducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_FAVOURITE': {
      const addedFavourite = action.payload.favourite
      const favourites = [...state.favourites, addedFavourite]
      return { favourites }
    }
    case 'REMOVE_FAVOURITE': {
      const removedFavourite = action.payload.favourite
      const favourites = state.favourites.filter(favourite => favourite.id !== removedFavourite)
      return { favourites }
    }
    default:
      return state
  }
}

const action = {
  type: 'ADD_FAVOURITE',
  payload: {
    favourite: {
      title: 'story1',
      id: 1 
    }
  }
}

const store = createStore(favouritesReducer)
store.dispatch(action)

console.log(store.getState())

export default store