/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */
import axios from 'axios';

// action types
const SAVE_ROSTER = 'SAVE_ROSTER';

// action creator
const _saveRoster = (rosterArray) => ({
  type: SAVE_ROSTER,
  rosterArray,
});

// thunk
const saveRoster = (rosterObj) => async (dispatch) => {
  try {
    const payload = {
        rosterObj
    };
    const teamRoster = (await axios.post('/api/saveRoster', rosterObj)).data;
 
    dispatch(_saveRoster(teamRoster));
    //window.location.reload();
  } catch (ex) {
    console.log(ex, 'error');
  }
};
export { saveRoster, SAVE_ROSTER };
