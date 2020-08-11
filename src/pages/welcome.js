import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/Appbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Person from '@material-ui/icons/Person';

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
        <h5>You get a Stata. You get a Stata. Everyone gets a Stata!</h5>
        <IconButton component={NavLink} to="/signup">
          <Typography variant="body1">Sign Up</Typography>
          <Person />
        </IconButton>
      </div>
    </div>
  );
};

export default Welcome;
