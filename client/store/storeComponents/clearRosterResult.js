/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

// action types
const CLEAR_ROSTER_RESULT = 'CLEAR_ROSTER_RESULT';
// action creator
const _clearRosterResult = () => ({
  type: CLEAR_ROSTER_RESULT,
});
// thunk
const clearRosterResult= () => async (dispatch) => {
  try {
    dispatch(_clearRosterResult());
    //window.location.reload();
  } catch (err) {
    console.log(err.response);
  }
};
export { clearRosterResult, CLEAR_ROSTER_RESULT };
