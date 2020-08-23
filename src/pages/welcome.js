import React from 'react';
import { NavLink } from 'react-router-dom';
import 'react-router-modal/css/react-router-modal.css';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Person from '@material-ui/icons/Person';
import Computer from '@material-ui/icons/Computer';

// placeholder, will replace with our own NavBar
const MUIAppBar = () => {
  return (
    <AppBar position="static">
      <Grid container direction="row" justify="flex-end">
        <IconButton component={NavLink} to="/signup">
          <Typography variant="body1">Sign Up</Typography>
          <Person />
        </IconButton>
      </Grid>
    </AppBar>
  );
};

const Welcome = (props) => {
  return (
    <div>
      <MUIAppBar />
      <div id="welcome-box">
        <h1>Open Stata</h1>
        <h2>
          An online, open-source text editor and tutorial for learning Stata
        </h2>
        <IconButton component={NavLink} to="/signup">
          <Typography variant="body1">Sign Up</Typography>
          <Person />
        </IconButton>
        <IconButton component={NavLink} to="/signin">
          <Typography variant="body1">Sign In</Typography>
          <Person />
        </IconButton>
        <IconButton component={NavLink} to="/editor">
          <Typography variant="body1">Go to editor (for api call)</Typography>
          <Computer />
        </IconButton>
      </div>
    </div>
  );
};

export default Welcome;
