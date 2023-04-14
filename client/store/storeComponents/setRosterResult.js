/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

// action types
const SET_ROSTER_RESULT = 'SET_ROSTER_RESULT';

// action creator
const _setRosterResult = (rosterArray) => ({
  type: SET_ROSTER_RESULT,
  rosterArray,
});

// thunk
const setRosterResult = (rosterArray) => async (dispatch) => {
  try {
    const payload = {
        rosterArray
    };
    
    dispatch(_setRosterResult(rosterArray));
    //window.location.reload();
  } catch (err) {
    console.log(err.response);
  }
};
export { setRosterResult, SET_ROSTER_RESULT };
