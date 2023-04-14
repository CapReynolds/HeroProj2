import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

const Welcome = (props) => {
    const [open, setOpen] = useState(true);

    const getStarted = (ev, reason) => {

        if (reason && reason == "backdropClick") 
            return;

        setOpen(false);
        const {func} = props;

        func(true);
    }

  return (
    <div id="centered_welcome" >
        <Dialog
        open={open}
        onClose={getStarted}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
            <Card sx={{background: '#E5E3E3'}}>
                <CardContent>
                <div id="centered_header">
                    <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
                        Welcome
                    </Typography>
                </div>
                <Typography sx={{ mb: 2.5 }} color="text.secondary" variant="body1">
                This is a simple react application where you can build your ultimate Avengers Team, using the Marvel Comics API. Click Get Started below to start searching for 5 of your favorite Marvel characters and then drag and drop them to build your team roster!
                </Typography>
                
                </CardContent>
                <div id="center_div">
                    <Button size="large" onClick={() => {getStarted()}} autoFocus>
                        Get Started
                    </Button>
                </div>
            </Card>
        </Dialog>
    </div>
  );
}

export default Welcome;
