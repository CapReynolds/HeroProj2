/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

// action types
const SET_VISIBILE = 'SET_VISIBILE';

// action creator
const _setVisibile = (visible) => ({
  type: SET_VISIBILE,
  visible,
});

// thunk
const setVisibile = (visible) => async (dispatch) => {
  try {
    const payload = {
        visible
    };

    dispatch(_setVisibile(visible));
    //window.location.reload();
  } catch (err) {
    console.log(err.response);
  }
};
export { setVisibile, SET_VISIBILE };
