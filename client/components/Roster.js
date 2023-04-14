import React from 'react';
import { connect } from 'react-redux';

import { setTab } from '../store/storeComponents/setTab';

import './styles/style.css';
import RosterSearch from './RosterSearch';
import SelectedRoster from './SelectedRoster';
import RosterList from './RosterList';


const Roster = (props) => {

  return (
    <div>
      <div>
        <RosterSearch />
        <div id="left_right">
          <SelectedRoster/>
          <RosterList />
        </div>
       </div>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    currTab: state.currTab,
    userResults: state.userResults,
    userRoster: state.userRoster,
    rosterSearched: state.rosterSearched,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTab: (tab) => {
      dispatch(setTab(tab));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Roster);