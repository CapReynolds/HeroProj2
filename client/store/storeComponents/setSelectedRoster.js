/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

// action types
const SET_SELECTED_ROSTER = 'SET_SELECTED_ROSTER';

// action creator
const _setSelectedRoster = (rosterArray) => ({
  type: SET_SELECTED_ROSTER,
  rosterArray,
});

// thunk
const setSelectedRoster = (rosterArray) => async (dispatch) => {
  try {
    const payload = {
        rosterArray
    };
    
    dispatch(_setSelectedRoster(rosterArray));
    //window.location.reload();
  } catch (err) {
    console.log(err.response);
  }
};
export { setSelectedRoster, SET_SELECTED_ROSTER };
