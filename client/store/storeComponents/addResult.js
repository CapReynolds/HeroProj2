/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

// action types
const ADD_RESULT = 'ADD_RESULT';

// action creator
const _addResult = (result) => ({
  type: ADD_RESULT,
  result,
});

// thunk
const addResult = (result) => async (dispatch) => {
  try {
    const payload = {
      result
    };
    dispatch(_addResult(result));
    //window.location.reload();
  } catch (err) {
    console.log(err.response);
  }
};
export { addResult, ADD_RESULT };
