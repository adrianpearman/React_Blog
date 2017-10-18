import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';
import _ from 'lodash';

export default function(state = {}, action){
  switch(action.type){
  case FETCH_POST:
    // ES5 Method
    // const post =  action.payload.data
    // // grabs all of the existing state values
    // const newState = {...state}
    // newState[post.id] = post
    // return newState

    // ES6 Method
    return {...state,[action.payload.data.id]: action.payload.data}
  case FETCH_POSTS:
    return _.mapKeys(action.payload.data, 'id')
    // This will return an object having the id as the key and the returning information as the value
  case DELETE_POST:
    return _.omit(state, action.payload)
  default:
    return state
  }
}
