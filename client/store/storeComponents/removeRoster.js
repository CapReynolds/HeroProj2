/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

// action types
const REMOVE_ROSTER = 'REMOVE_ROSTER';
// action creator
const _removeRoster = (character_id) => ({
  type: REMOVE_ROSTER,
  character_id,
});
// thunk
const removeRoster= (character_id) => async (dispatch) => {
  try {
    const payload = {
        character_id
    };
    
    dispatch(_removeRoster(character_id));
  } catch (err) {
    console.log(err.response);
  }
};
export { removeRoster, REMOVE_ROSTER };
