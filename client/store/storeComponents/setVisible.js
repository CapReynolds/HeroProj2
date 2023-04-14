/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

// action types
const SET_VISIBLE = 'SET_VISIBLE';

// action creator
const _setVisible = (visible) => ({
  type: SET_VISIBLE,
  visible,
});

// thunk
const setVisible = (visible) => async (dispatch) => {
  try {
    const payload = {
        visible
    };

    dispatch(_setVisible(visible));
    //window.location.reload();
  } catch (err) {
    console.log(err.response);
  }
};
export { setVisible, SET_VISIBLE };
