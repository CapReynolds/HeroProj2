import React, {useState} from 'react';
import axios from 'axios';

import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import { CardActionArea } from '@mui/material';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';

import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import './styles/style.css';

import AlertDialog from "./AlertDialog";
import Popover from '@mui/material/Popover';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {getItemStyle, getItemStyle2, getItemStyle3, getListStyle, getListStyle2} from './utils/DisplayStyles';

import { connect, useSelector } from 'react-redux';
import { setResult } from '../store/storeComponents/setResult';
import { addResult } from '../store/storeComponents/addResult';
import { removeResult } from '../store/storeComponents/removeResult';
import { removeRoster } from '../store/storeComponents/removeRoster';
import { addRoster } from '../store/storeComponents/addRoster';
import { setRoster } from '../store/storeComponents/setRoster';
import { setTab } from '../store/storeComponents/setTab';
import { setVisible } from '../store/storeComponents/setVisible';
import { setHidden } from '../store/storeComponents/setHidden';

const Search = (props) => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [teamName, setTeamName] = useState('');
  const [username, setUsername] = useState('');
  
  const [resultsSet, setResultsSet] = useState([]);
  const [heroTeam, setheroTeam] = useState([]);
  const [searchResult, setSearchResult] = useState({});

  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  //testing for the redux
  const allResults = useSelector(state => state.allResults);

  //for the full team roster
  const [rosterFull, setRosterFull] = useState(false);
  const [dropDestination, setDropDestination] = useState('');
  
  //for the info popover
  const [anchorEl, setAnchorEl] = useState(null);

  const [popOverEl, setPopOverEl] = useState({
    openedPopoverId: null,
    anchorEl: null,
  });

  // const [visible, setVisible] = useState('hidden');

  const handleClick = (charID, ev) => {
    console.log(charID, 'id');
    console.log(ev.currentTarget);

    //setAnchorEl(ev.currentTarget);

    setPopOverEl({
      openedPopoverId: charID,
      anchorEl: ev.currentTarget,
    })
  };

  const handleClose = () => {
    //setAnchorEl(null);
    setPopOverEl({
      openedPopoverId: null,
      anchorEl: null,
    })
  };

  //const open = Boolean(popOverEl.anchorEl);

  const pop_id = open ? 'simple-popover' : undefined;

  const Remove = (charID) => {

    if(props.userResults.some((char)=> char.id === charID)){
      props.removeResult(charID);
    }
    else{
      props.removeRoster(charID);
     
      if(props.userRoster.length <= 5){
        setRosterFull(false);

        //props.setHidden('hidden');
      }
    }

  };


  const SearchCharacters = async(ev) => {
    //find hero and push onto results array
    let result = '';
    ev.preventDefault();
    if(searchTerm != ""){

      if(resultsSet.length <= 15){
        result = (await axios('api/getcharacters', {params:{val: searchTerm}})).data;

        if(result.status !== "error"){
          setSearchResult(result);
      
          //check if result is already on results array
          if (props.userResults.some(e => e.name === result.name)) {
           
            setMessage("This character is already in your results");
            setError(true);
          }
          else if(props.userRoster.some(e => e.name === result.name)){
            setMessage("This character is already on the team roster");
            setError(true);
          }
          else{
            //add the result to the results list
            props.addResult(result);
          }
        }
        else{
          setMessage(`No results found. 
          If you are searching for a character who shares the same name as another hero try searching for the character with the real name in parenthesis.
          For example for Miles Morales Spider-Man, try: Spider-Man (Miles Morales)`);
          setError(true);
        }
      }
      else{
        setMessage("Please reduce the amount of characters in your results feed before adding any more.");
        setError(true);
      }
    }
    else{
      // alert("Please enter a search term")
      setMessage("Please enter a character to search for.");
      setError(true);
    }

    setSearchTerm("");
  }
  
  function handleOnDragEnd(result) {
    if(!result.destination) {
        console.log(result, "no destination");
        return;
    }
    //console.log(result, 'at the start of function');
    setDropDestination(result.destination);

    //check against the real array !
    //const results = Array.from(resultsSet);
    //const heroes = Array.from(heroTeam);

    const results = Array.from(props.userResults);
    const heroes = Array.from(props.userRoster);

    if (heroes.some(e => e.name === result.droppableId)) {
      alert("Character can't be added a second time")
    }
    
    if(result.source.droppableId === result.destination.droppableId) {
      //moving within the same set
        if(result.source.droppableId === 'allResults'){
            const [reorderedItem] = results.splice(result.source.index, 1);
            results.splice(result.destination.index, 0, reorderedItem);
            props.setResult(results);
        }
        else {
            const [reorderedItem] = heroes.splice(result.source.index, 1);
            heroes.splice(result.destination.index, 0, reorderedItem);
            props.setRoster(heroes);
        }
    }
    else {
        //moving to a different set
        if(result.destination.droppableId === 'TeamRoster')
        {
            if(heroes.length >= 5){
              console.log("over the limit in heroes")
              setRosterFull(true);
              //alert("Heroes roster is full");
            }
            else{
              const [reorderedItem] = results.splice(result.source.index, 1);
              if (heroes.some(e => e.name === result.droppableId)) {
                // heroes already contains the character 
                
                alert("Character can't be added a second time")
              }
              else {
                // heroes does not contain the character 
                heroes.splice(result.destination.index, 0, reorderedItem);
                props.setResult(results);
                props.setRoster(heroes)
                //console.log(props, ' props');
              }
            }
            //if the heroes roster is full
            if(heroes.length >= 5){
              setMessage("Your Hero Roster is full. Ready to save it?");
              setError(true);
              setRosterFull(true);
              //props.setVisibile('visible');

              //setVisible('visible');
            }
        }
        else{
            const [reorderedItem] = heroes.splice(result.source.index, 1);
            results.splice(result.destination.index, 0, reorderedItem);
            props.setResult(results);
            props.setRoster(heroes)
        }
       
    }

    setResultsSet(results);
    setheroTeam(heroes);

   
  }


  return (
    <div className = "area">
      {error ? <AlertDialog error={error} rosterFull={rosterFull} message={message} _setError={setError} _setTab={props.setTab} _setTeamName={setTeamName} _setUsername={setUsername}></AlertDialog> : "" }
      {/* {rosterFull ? <AlertRoster error={true} message={"Hero Roster is full. Ready to save it?"} func={setRosterFull}></AlertRoster> : "" } */}
      <div className ="search_area2">
        <form name="hero_form" className ="search_form" onSubmit={SearchCharacters}>
          <TextField id="filled-basic" variant="filled" placeholder="Enter Character Name" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <Button variant="outlined" type="submit" value="submit" sx={{height:55}}>Search</Button>
        </form>
      </div>
      <div className ="results_area">
              <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="allResults" direction="horizontal">
                      {(provided, snapshot) => (
                        <div className="results_list_outer">
                          <div className="results_list_inner">
                            <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                                {props.userResults.map(({id, name, imagePath, description, attributionText, attributionHTML}, index) => {
                                    return (
                                      <Draggable key={id} draggableId={name} index={index} >
                                          {(provided, snapshot) => (
                                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                          )} >
                                            <Card style={getItemStyle3(
                                              snapshot.isDragging,
                                              provided.draggableProps.style
                                            )} sx={{ maxWidth: 345, borderRadius: 5, minWidth: 345, height: 391, borderStyle: "solid" }}>
                                                <div>
                                                  <CardActionArea id = "image_div" style={{width: 40}}>
                                                    <RemoveCircleTwoToneIcon type="button" style={{width: 40, height: 40, color:"red"}} onClick={() => Remove(id)} />
                                                  </CardActionArea>
                                                  <CardMedia
                                                      sx={{ height: 200}}
                                                      image={imagePath}
                                                      title={name}
                                                    />
                                                </div>
                                                <CardContent style={{overFlow: "scroll", paddingBottom:0}}>
                                                  <Typography gutterBottom variant="h5" component="div">
                                                    {name}
                                                  </Typography>
                                                  <Typography variant="body2" color="text.secondary" component="div">
                                                    <div id="char_des">
                                                      <div className="char_inner">
                                                      {description}
                                                      </div>
                                                    </div>
                                                  </Typography>
                                                </CardContent>
                                                <CardActions>
                                                  <div id="footer">
                                                    {/* <Button size="small">Share</Button> */}
                                                    <Typography variant="subtitle1" color="text.secondary" align="right" sx={{fontSize: 11}}>{attributionText}</Typography>
                                                  </div>
                                                </CardActions>
                                            </Card>
                                          </div>
                                          )}
                                      </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                          </div>
                      </div>
                      )}
                  </Droppable>
                  <Droppable droppableId="TeamRoster" direction="horizontal" isDropDisabled={props.userRoster.length >= 5 ? true : false }>
                      {(provided, snapshot) => (
                        <div className="hero_roster_outer">
                          <div className="hero_roster_inner">
                            <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle2(snapshot.isDraggingOver, props.userRoster.length)}>
                                {props.userRoster.map(({id, name, description,imagePath, attributionText, attributionHTML, furtherReading}, index) => {
                                    return (
                                        <Draggable key={id} draggableId={name} index={index} isDragDisabled={props.userRoster.length >= 5 ? true : false }>
                                            {(provided, snapshot) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle2(
                                                  snapshot.isDragging,
                                                  provided.draggableProps.style
                                                )}>
                                              <Card style={getItemStyle3(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                              )} sx={{ maxWidth: 295, borderRadius: 5, minWidth: 295, height: 250, borderStyle: "solid" }}>
                                                  <div id="container">
                                                    <CardMedia
                                                        sx={{ height: 250}}
                                                        image={imagePath}
                                                        title={name}
                                                      />
                                                      <div id="centered">
                                                      <Typography gutterBottom variant="h5" component="div">
                                                        {name}
                                                      </Typography>
                                                      </div>
                                                      <div id="bottom_left">
                                                        <CardActionArea id = "image_div" style={{width: 40}}>
                                                          <RemoveCircleTwoToneIcon type="button" style={{width: 40, height: 40, color:"red"}} onClick={() => Remove(id)} />
                                                        </CardActionArea>
                                                      </div>
                                                      <div id="bottom_right">
                                                        <CardActionArea id = "image_div" style={{width: 40}}>
                                                          <InfoOutlinedIcon aria-describedby={pop_id} onClick={(ev) => handleClick(id, ev)} style={{width: 40, height: 40, color:"red"}}/>
                                                          <Popover 
                                                            id={pop_id}
                                                            open={Boolean(popOverEl.openedPopoverId === id)}
                                                            anchorEl={popOverEl.anchorEl}
                                                            onClose={handleClose}
                                                            anchorOrigin={{
                                                              vertical: 'bottom',
                                                              horizontal: 'right',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'left',
                                                              }}
                                                            >
                                                              <Typography sx={{ p: 2 }}>Visit Marvel.com for <Link href={furtherReading} target="_blank" underline="hover" rel="noopener">comics featuring </Link> this character</Typography>
                                                          </Popover>
                                                        </CardActionArea>
                                                      </div>
                                                  </div>
                                                
                                              </Card>
                                            </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                          </div>
                      </div>
                      )}
                  </Droppable>
              </DragDropContext>
        </div>
    </div>
        
  );

}

//export default Search;
const mapStateToProps = (state) => {
  return {
    userResults: state.userResults,
    userRoster: state.userRoster,
    rosterVisibility: state.rosterVisibility,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addResult: (result) => {
      dispatch(addResult(result));
    },
    setResult: (resultsSet) => {
      dispatch(setResult(resultsSet));
    },
    addRoster: (result, reorderedItem) => {
      dispatch(addRoster(result, reorderedItem));
    },
    removeResult: (charID) => {
      dispatch(removeResult(charID));
    },
    removeRoster: (charID) => {
      dispatch(removeRoster(charID));
    },
    setRoster: (TeamRoster) => {
      dispatch(setRoster(TeamRoster));
    },
    setTab: (tab) => {
      dispatch(setTab(tab));
    },
    setVisible: (visible) => {
      dispatch(setVisible(visible));
    },
    setHidden: (visible) => {
      dispatch(setHidden(visible));
    },
  };
};

export default connect( mapStateToProps, mapDispatchToProps)(Search);


