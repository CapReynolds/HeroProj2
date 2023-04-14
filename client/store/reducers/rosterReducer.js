//import { LOAD_RESULTS } from '../storeComponents/loadResults';
import { LOAD_ROSTER } from '../storeComponents/loadRoster';
import { ADD_ROSTER } from '../storeComponents/addRoster.js';
import { REMOVE_ROSTER } from '../storeComponents/removeRoster';
import { SET_ROSTER } from '../storeComponents/setRoster.js';
import { SAVE_ROSTER } from '../storeComponents/saveRoster.js';

const rosterReducer = (state = [], action) => {
  if (action.type === ADD_ROSTER) {
    return [...state, action.result];
  }
  if (action.type === REMOVE_ROSTER) {
    //stuff
    return [...state].filter((character) => character.id !== action.character_id);
  }
  if (action.type === SET_ROSTER) {
    return action.rosterArray;
  }
  if (action.type === SAVE_ROSTER) {
    return action.rosterArray;
  }
 
  return state;
};
export default rosterReducer;
