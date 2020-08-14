import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/Appbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Person from '@material-ui/icons/Person';
import Computer from '@material-ui/icons/Computer';
import axios from 'axios';

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
  const [vars, setVars] = useState(0);
  const [title, setTitle] = useState('none');

  const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
  const ROOT_URL = 'http://openstata-api.herokuapp.com';

  const callAPI = () => {
    axios.get(`${PROXY_URL}${ROOT_URL}/data`).then((result) => {
      console.log('API:', result.data.data_result);
      setVars(result.data.data_result[0].num_vars);
      setTitle(result.data.data_result[0].title);
    });
  };

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
        <IconButton onClick={callAPI}>
          <Typography variant="body1">Call API</Typography>
          <Computer />
        </IconButton>
        <p>
          Title: {title}. Vars: {vars}
        </p>
      </div>
    </div>
  );
};

export default Welcome;
