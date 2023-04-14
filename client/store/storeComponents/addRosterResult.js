/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

// action types
const ADD_ROSTER_RESULT = 'ADD_ROSTER_RESULT';

// action creator
const _addRosterResult = (result) => ({
  type: ADD_ROSTER_RESULT,
  result,
});

// thunk
const addRosterResult = (result) => async (dispatch) => {
  try {
    const payload = {
      result
    };
    dispatch(_addRosterResult(result));
    //window.location.reload();
  } catch (err) {
    console.log(err.response);
  }
};
export { addRosterResult, ADD_ROSTER_RESULT };
