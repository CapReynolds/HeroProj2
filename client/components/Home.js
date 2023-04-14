import * as React from 'react';

import { connect } from 'react-redux';

// const blue = {
//   50: '#F0F7FF',
//   100: '#C2E0FF',
//   200: '#80BFFF',
//   300: '#66B2FF',
//   400: '#3399FF',
//   500: '#007FFF',
//   600: '#0072E5',
//   700: '#0059B2',
//   800: '#004C99',
//   900: '#003A75',
// };

// const grey = {
//   50: '#f6f8fa',
//   100: '#eaeef2',
//   200: '#d0d7de',
//   300: '#afb8c1',
//   400: '#8c959f',
//   500: '#6e7781',
//   600: '#57606a',
//   700: '#424a53',
//   800: '#32383f',
//   900: '#24292f',
// };

// const Tab = styled(TabUnstyled)`
//   font-family: IBM Plex Sans, sans-serif;
//   color: #fff;
//   cursor: pointer;
//   font-size: 0.875rem;
//   font-weight: 600;
//   background-color: transparent;
//   width: 100%;
//   padding: 10px 12px;
//   margin: 6px 6px;
//   border: none;
//   border-radius: 7px;
//   display: flex;
//   justify-content: center;

//   &:hover {
//     background-color: ${blue[400]};
//   }

//   //sle
//   &:focus {
//     color: #fff;
//     outline: 3px solid ${blue[200]};
//   }

//   &.${tabUnstyledClasses.selected} {
//     background-color: #E5E3E3;
//     color: ${blue[600]};
//   }

//   &.${buttonUnstyledClasses.disabled} {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }
// `;

// const TabPanel = styled(TabPanelUnstyled)(
//   ({ theme }) => ` 
//   margin: auto;
//   width: 98%;
//   font-family: IBM Plex Sans, sans-serif;
//   font-size: 0.875rem;
//   padding: 20px 12px;
//   background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
//   border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
//   border-radius: 12px;
//   `,
// );

// const TabsList = styled(TabsListUnstyled)(
//   ({ theme }) => `
//   min-width: 400px;
//   background-color: ${blue[500]};
//   border-radius: 12px;
//   margin-bottom: 16px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   align-content: space-between;
//   box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
//   `,
// );

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
