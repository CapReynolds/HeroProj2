/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

// action types
const ADD_ROSTER = 'ADD_ROSTER';
// action creator
const _addRoster = (result, reorderedItem) => ({
  type: ADD_ROSTER,
  result,
  reorderedItem
});
// thunk
const addRoster= (result, reorderedItem) => async (dispatch) => {
  try {
    const payload = {
      result,
      reorderedItem
    };

    dispatch(_addRoster(result, reorderedItem));
    //window.location.reload();
  } catch (err) {
    console.log(err.response);
  }
};
export { addRoster, ADD_ROSTER };
