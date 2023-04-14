/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

//import axios from 'axios';
//import getToken from '../../components/utils/getToken';

// action types
const LOAD_RESULTS = 'LOAD_RESULTS';

// action creator
const _loadResults = (results) => ({
  type: LOAD_RESULTS,
  results,
});

// thunk
const loadResults = (userResults) => async (dispatch) => {
  try {
    
    dispatch(_loadResults(userResults));
  } catch (err) {
    console.log(err.response);
  }
};

export { loadResults, LOAD_RESULTS };
