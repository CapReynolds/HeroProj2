//import { LOAD_RESULTS } from '../storeComponents/loadResults';

import { ADD_ROSTER_RESULT } from '../storeComponents/addRosterResult.js';
import { CLEAR_ROSTER_RESULT } from '../storeComponents/clearRosterResult.js';
import { SET_ROSTER_RESULT } from '../storeComponents/setRosterResult.js';

const rosterReducer = (state = [], action) => {
  if (action.type === ADD_ROSTER_RESULT) {
    return [...state, action.result]
  }
  if (action.type === CLEAR_ROSTER_RESULT) {
    return []
  }
  if (action.type === SET_ROSTER_RESULT) {
    console.log(state.rosterArray, 'about to return');
    return action.rosterArray;
  }
 
  return state;
};
export default rosterReducer;
