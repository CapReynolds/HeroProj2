/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

// action types
const SET_HIDDEN_LIST = 'SET_HIDDEN_LIST';

// action creator
const _setHiddenList = (visible) => ({
  type: SET_HIDDEN_LIST,
  visible,
});

// thunk
const setHiddenList = (visible) => async (dispatch) => {
  try {
    const payload = {
        visible
    };

    dispatch(_setHiddenList(visible));
    //window.location.reload();
  } catch (err) {
    console.log(err.response);
  }
};
export { setHiddenList, SET_HIDDEN_LIST };
