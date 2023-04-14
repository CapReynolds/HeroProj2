import React, {useState} from 'react';
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

import './styles/style.css';
import { setRosterResult } from '../store/storeComponents/setRosterResult';
import { setVisibleList } from '../store/storeComponents/setVisibleList';

import AlertDialog from './AlertDialog';

const RosterSearch = (props) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    const SearchRosters = async(ev) => {
        try{
            //find hero and push onto results array
            ev.preventDefault();

            let allResults = [];

            if(searchTerm != ""){
                allResults = (await axios('api/getTeams', {params:{val: searchTerm}})).data;
                //allResults = getRosters(searchTerm);
                props.setVisibleList('visible');
                props.setRosterResult(allResults);
            }
            else{
                setMessage("Please enter a Team Name to search for");
                setError(true);
            }

            setSearchTerm("");
        }
        catch(err){
            console.log(err);
        }
    }

    return (
    <div className = "area">
        {error ? <AlertDialog error={error} message={message} _setError={setError}  ></AlertDialog> : "" }
        <div className ="search_area2">
            <form className ="roster_search_form" onSubmit={SearchRosters}>
                <TextField id="filled-basic" variant="filled" sx={{width: '192px'}} placeholder="Enter Your Team Name" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <Button variant="outlined" type="submit" value="submit" sx={{height:55}}>Search</Button>
            </form>
        </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userRosterResults: state.userRosterResults,
    userRoster: state.userRoster,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setRosterResult: (rosterArray) => {
            dispatch(setRosterResult(rosterArray));
        },
        setVisibleList: (visible) => {
            dispatch(setVisibleList(visible));
        },
    };
}

//export default Roster;
export default connect( mapStateToProps, mapDispatchToProps)(RosterSearch);