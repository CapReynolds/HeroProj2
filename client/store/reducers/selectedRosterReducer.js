//import { LOAD_RESULTS } from '../storeComponents/loadResults';
import { SET_SELECTED_ROSTER } from '../storeComponents/setSelectedRoster.js';

const selectedRosterReducer = (state = [], action) => {
  if (action.type === SET_SELECTED_ROSTER) {
    return action.rosterArray;
  }
 
  return state;
};
export default selectedRosterReducer;
