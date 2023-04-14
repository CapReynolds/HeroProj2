/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

// action types
const SET_RESULT = 'SET_RESULT';

// action creator
const _setResult = (resultArray) => ({
  type: SET_RESULT,
  resultArray,
});

// thunk
const setResult = (resultArray) => async (dispatch) => {
  try {
    const payload = {
        resultArray
    };
    
    dispatch(_setResult(resultArray));
    //window.location.reload();
  } catch (err) {
    console.log(err.response);
  }
};
export { setResult, SET_RESULT };
