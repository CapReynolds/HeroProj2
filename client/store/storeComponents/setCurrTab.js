// action type
const SET_CURR_TAB = 'SET_CURR_TAB';

// action creators
const _setCurrTab = (user) => ({ type: SET_CURR_TAB, user });

// thunk
const setCurrTab = (user) => async (dispatch) => {
  try {
    dispatch(_setCurrTab(user));
  } catch (err) {
    console.log(err.response);
  }
};

export { setCurrTab, SET_CURR_TAB};
