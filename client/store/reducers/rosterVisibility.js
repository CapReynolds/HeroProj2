//import { LOAD_RESULTS } from '../storeComponents/loadResults';

import { SET_VISIBLE } from '../storeComponents/setVisible.js';
import { SET_HIDDEN } from '../storeComponents/setHidden.js';

const rosterVisibility = (state = 'hidden', action) => {
  if (action.type === SET_VISIBLE) {
    
    return 'visible'
  }
  if (action.type === SET_HIDDEN) {
        return 'hidden'
  }
 
  return state;
};
export default rosterVisibility;
