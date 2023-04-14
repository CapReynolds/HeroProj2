/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

// action types
const SET_VISIBLE_LIST = 'SET_VISIBLE_LIST';

// action creator
const _setVisibleList = (visible) => ({
  type: SET_VISIBLE_LIST,
  visible,
});

// thunk
const setVisibleList = (visible) => async (dispatch) => {
  try {
    const payload = {
        visible
    };

    dispatch(_setVisibleList(visible));
    //window.location.reload();
  } catch (err) {
    console.log(err.response);
  }
};
export { setVisibleList, SET_VISIBLE_LIST };
