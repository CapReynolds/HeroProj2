import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField  from '@mui/material/TextField';

import { saveRoster } from '../store/storeComponents/saveRoster';
import { setSelectedRoster } from '../store/storeComponents/setSelectedRoster';
import { setVisible } from '../store/storeComponents/setVisible';

const AlertDialog = (props) => {
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const [isFull, setIsFull] = useState(false);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [errorText1, setErrorText1] = useState('');
    const [errorText2, setErrorText2] = useState('');

    const validate = (prop) => {
      const regex = /[@~`!#$%\^&*+=\\[\]\\';,/{}|\\":<>\?]/g;

      if(prop === 'name')
      {
        if(regex.test(prop))
          setErrorText1("Please remove any special characters");
        else
          setErrorText1("");
      
      }
      else{
        if(regex.test(prop))
          setErrorText2("Please remove any special characters");
        else
          setErrorText2("");
        }
    }

    const onSave = async() => {

      const {_setTab, _setTeamName, _setUsername} = props;

      const rosterObj ={
        name: name,
        username: username,
        roster: props.userRoster,
      }

      if(isFull){
          //set the team name and new tab
          _setTeamName(name);
          _setUsername(username);
          //setRoster(rosterObj)
          props.saveRoster(rosterObj);
          props.setSelectedRoster(rosterObj.roster);
          props.setVisible('visible');
          handleClose();
          _setTab(1);
      
      }
    }

  const handleClose = (ev, reason) => {

    if (reason && reason == "backdropClick") 
        return;

    setOpen(false);

    const {_setError} = props;
    _setError(false);

   
  };

    useEffect(()=>{
        const {error, rosterFull, message} = props;

        setOpen(error);
        setMsg(message);
        setIsFull(rosterFull)

    },[props]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {isFull ?
        <div>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {msg}
              {/* <TextField margin="dense" id="team_name" label="Enter Your Team Name" type="name" fullWidth variant="standard"/> */}
            </DialogContentText>
            <TextField 
              id="team_name" 
              margin="dense" 
              variant="standard" 
              fullWidth placeholder="Enter Your Team Name" 
              value={name} 
              onChange={e => {setName(e.target.value); validate(name)}} 
              inputProps={{maxLength: 15}}
              error = {errorText1.length === 0 ? false : true }
              helperText={errorText1}
            />
            <TextField 
              id="username" 
              margin="dense" 
              variant="standard" 
              fullWidth placeholder="Enter Your Username" 
              value={username} 
              onChange={e => {setUsername(e.target.value); validate(username)}} 
              inputProps={{ maxLength:15}} 
              error = {errorText2.length === 0 ? false : true } 
              helperText={errorText2}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() =>{handleClose()}} autoFocus>
              Go Back
            </Button>
            <Button 
              disabled= {(errorText1.length === 0 || errorText2.length === 0) && (name.length != 0 && username.length != 0) ? false : true }
              onClick={() =>{onSave()}} autoFocus>
                Save
            </Button>
          </DialogActions> 
        </div> :
        <div>
         <DialogContent>
         <DialogContentText id="alert-dialog-description">
           {msg}
         </DialogContentText>
       </DialogContent>
         <DialogActions>
         <Button onClick={handleClose} autoFocus>
           Okay
         </Button>
       </DialogActions>
       </div>
         }
      </Dialog>
    </div>
  );
}

//export default AlertDialog;
const mapStateToProps = (state) => {
  return {
    userRoster: state.userRoster,
    selectedRoster: state.selectedRoster,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveRoster: (rosterObj) => {
      dispatch(saveRoster(rosterObj));
    },
    setSelectedRoster: (rosterArray) => {
      dispatch(setSelectedRoster(rosterArray));
    },
    setVisible: (visible) => {
      dispatch(setVisible(visible));
    },
  };
};

export default connect( mapStateToProps, mapDispatchToProps)(AlertDialog);