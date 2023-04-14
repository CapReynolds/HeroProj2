import React, {useState} from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { connect } from 'react-redux';

import GroupsIcon from '@mui/icons-material/Groups';
import { setSelectedRoster } from '../store/storeComponents/setSelectedRoster';
import { setVisible } from '../store/storeComponents/setVisible';
//import {url} from 

import './styles/style.css';


const RosterList = (props) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(1);

    const handleListItemClick = (ev, index) => {
        console.log('clicke4d');
        props.setVisible('visible');
        setSelectedIndex(index);
        props.setSelectedRoster(props.userRosterResults[index].characters);
    };

    return (
            <div id="div_right" style={{visibility:props.rosterListVisible}}>
                {props.userRosterResults.length === 0 ? 
                <List component="nav" aria-label="roster_list" sx={{width: '100%'}}>
                    <ListItemButton
                        selected={selectedIndex === 0}
                    >
                    <ListItemIcon>
                        <GroupsIcon />
                    </ListItemIcon>
                        <ListItemText primary= {`No Results found`} />
                    </ListItemButton>
                </List> : 
                <List component="nav" aria-label="roster_list" sx={{width: '100%'}}>

                    {props.userRosterResults.map(({id, name, username}, index) => {
                        return ( 
                            
                            <ListItemButton
                                key = {id}
                                index = {index}
                                selected={selectedIndex === index}
                                onClick={(ev) => handleListItemClick(ev, index)}
                            >
                            <ListItemIcon>
                                <GroupsIcon />
                            </ListItemIcon>
                                <ListItemText primary= {`${name} By: ${username}`} />
                            </ListItemButton>
                        );
                        })}
                </List>}
                
            </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userRosterResults: state.userRosterResults,
    userRoster: state.userRoster,
    allRosters: state.allRosters,
    rosterListVisible: state.rosterListVisible,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addRosterResult: (result) => {
            dispatch(addRosterResult(result));
        },
        setSelectedRoster: (rosterArray) => {
            dispatch(setSelectedRoster(rosterArray));
        },
        setVisible: (visible) => {
            dispatch(setVisible(visible));
        },
    };
}

//export default Roster;
export default connect( mapStateToProps, mapDispatchToProps)(RosterList);