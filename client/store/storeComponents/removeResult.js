/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

// action types
const REMOVE_RESULT = 'REMOVE_RESULT';

// action creator
const _removeResult = (character_id) => ({
  type: REMOVE_RESULT,
  character_id,
});

// thunk
const removeResult = (character_id) => async (dispatch) => {
  try {
    const payload = {
        character_id
    };
    dispatch(_removeResult(character_id));
    //window.location.reload();
  } catch (err) {
    console.log(err.response);
  }
};
export { removeResult, REMOVE_RESULT };
