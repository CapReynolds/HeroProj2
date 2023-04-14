import { combineReducers } from 'redux';
import rosterReducer from './rosterReducer';
import selectedRosterReducer from './selectedRosterReducer';
import resultsReducer from './resultsReducer';
import rosterResults from './rosterResults';
import tabReducer from './tabReducer';
import rosterVisibility from './rosterVisibility';
import rosterListVisible from './rosterListVisible';

const reducer = combineReducers({
  userResults: resultsReducer,
  userRoster: rosterReducer,
  selectedRoster: selectedRosterReducer,
  userRosterResults: rosterResults,
  currTab: tabReducer,
  rosterVisibility: rosterVisibility,
  rosterListVisible: rosterListVisible,
});

export default reducer;