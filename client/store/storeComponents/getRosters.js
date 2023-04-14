/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */
import axios from 'axios';

// action types
const GET_ROSTERS = 'GET_ROSTERS';

// action creator
const _getRosters = (rosterArray) => ({
  type: GET_ROSTERS,
  rosterArray,
});

// thunk
const getRosters = (searchName) => async (dispatch) => {
  try {
    const payload = {
        searchName
    };
    //search the saved rosters using the search term
    const allRosters =  (await axios('api/getTeams', {params:{val: searchName}})).data;

    dispatch(_getRosters(allRosters));
    //window.location.reload();
  } catch (err) {
    console.log(err.response);
  }
};
export { getRosters, GET_ROSTERS };
