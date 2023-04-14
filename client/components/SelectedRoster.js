import React from 'react';
import { connect } from 'react-redux';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import './styles/style.css';


const SelectedRoster = (props) => {

    return (
    <div id="div_left">
      <div className="heroTeam" style={{visibility:props.rosterVisibility}}>
       {props.selectedRoster.map(({id, name, description,imagePath, attributionText, attributionHTML, furtherReading}, index) => {
        return (
          <div id={`outside${index}`} key={id}>
            <div id={`inside${index}`} style={{backgroundImage: `url(${imagePath})`, backgroundSize: "cover", backgroundPosition: 'left 35% bottom 45%'}}>
              <div id="lower_bottom">
         
                <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                color: 'white',
              }}
              title={name} 
              position="below"
              
            />
                </div>
              </div>
          </div>
        );
       })} 
       </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userResults: state.userResults,
    userRoster: state.userRoster,
    rosterVisibility : state.rosterVisibility,
    selectedRoster: state.selectedRoster,
  };
};

export default connect( mapStateToProps)(SelectedRoster);