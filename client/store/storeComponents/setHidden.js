/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

// action types
const SET_HIDDEN = 'SET_HIDDEN';

// action creator
const _setHidden = (visible) => ({
  type: SET_HIDDEN,
  visible,
});

// thunk
const setHidden = (visible) => async (dispatch) => {
  try {
    const payload = {
        visible
    };

    dispatch(_setHidden(visible));
    //window.location.reload();
  } catch (err) {
    console.log(err.response);
  }
};
export { setHidden, SET_HIDDEN };
