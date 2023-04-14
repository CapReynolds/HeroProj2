import { LOAD_RESULTS } from '../storeComponents/loadResults';
import { ADD_RESULT } from '../storeComponents/addResult';
import { REMOVE_RESULT } from '../storeComponents/removeResult';
import { SET_RESULT } from '../storeComponents/setResult';

const resultsReducer = (state = [], action) => {
  if (action.type === ADD_RESULT) {
    
    return [...state, action.result]
  }
  if (action.type === LOAD_RESULTS) {
    return action.results;
  }
  if (action.type === REMOVE_RESULT) {
    //stuff
    return [...state].filter((character) => character.id !== action.character_id);
  }
  if (action.type === SET_RESULT) {
    return action.resultArray;
  }
 
  return state;
};
export default resultsReducer;
