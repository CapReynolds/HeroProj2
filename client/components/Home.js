import * as React from 'react';

import { connect } from 'react-redux';

import Search from "./Search";
import Roster from "./Roster";
import Welcome from "./Welcome";
import {useState} from "react";
import { setTab } from '../store/storeComponents/setTab';
import {Tab, TabPanel, TabsList, TabsUnstyled } from './utils/DisplayStyles'

const Home = (props) => {

  const [isWelcomed, setIsWelcomed] = useState(false);

  const handleChange = () =>{
    setVal(props.currTab);
  }

  const changeTab = (tabNum) =>{
    props.setTab(tabNum);
  }
  const [val, setVal] = useState(2);

  //setVal(props.currTab);

  return (
    <div id="nav_bar">
      {isWelcomed != true ? <Welcome func={setIsWelcomed}/> : ""}
        <TabsUnstyled value={props.currTab}   onChange={handleChange}>
          <TabsList>
            {/* <Tab id="Tabs"  onClick={()=>changeTab(0)} >Home</Tab> */}
            <Tab id="Tabs"  onClick={()=>changeTab(0)}>Search</Tab>
            <Tab id="Tabs"  onClick={()=>changeTab(1)}>Rosters</Tab>
          </TabsList>
          {/* <TabPanel value={0} ><Welcome /></TabPanel> */}
          <TabPanel value={0} ><Search /></TabPanel>
          <TabPanel value={1}><Roster /></TabPanel>
        </TabsUnstyled> 
      </div>
  );
}

//export default Home;

const mapStateToProps = (state) => {
  return {
    currTab: state.currTab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTab: (tab) => {
      dispatch(setTab(tab));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
