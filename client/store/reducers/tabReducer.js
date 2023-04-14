import { SET_TAB } from '../storeComponents/setTab.js';

const tabReducer = (state = 0, action) => {
  if (action.type === SET_TAB) {
    return action.tab;
  }

  return state;
};
export default tabReducer;
