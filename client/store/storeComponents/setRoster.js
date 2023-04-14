/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

// action types
const SET_ROSTER = 'SET_ROSTER';

// action creator
const _setRoster = (rosterArray) => ({
  type: SET_ROSTER,
  rosterArray,
});

// thunk
const setRoster = (rosterArray) => async (dispatch) => {
  try {
    const payload = {
        rosterArray
    };
    
    dispatch(_setRoster(rosterArray));
    //window.location.reload();
  } catch (err) {
    console.log(err.response);
  }
};
export { setRoster, SET_ROSTER };
