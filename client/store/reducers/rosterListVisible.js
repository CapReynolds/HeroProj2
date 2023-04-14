//import { LOAD_RESULTS } from '../storeComponents/loadResults';

import { SET_VISIBLE_LIST } from '../storeComponents/setVisibleList.js';
import { SET_HIDDEN_LIST } from '../storeComponents/setHiddenList.js';

const rosterListVisible = (state = 'hidden', action) => {
  if (action.type === SET_VISIBLE_LIST) {
    return 'visible'
  }
  if (action.type === SET_HIDDEN_LIST) {
        return 'hidden'
  }
 
  return state;
};
export default rosterListVisible;
