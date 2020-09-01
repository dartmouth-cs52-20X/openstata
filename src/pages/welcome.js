import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

/* import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid'; */
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Person from '@material-ui/icons/Person';
import Computer from '@material-ui/icons/Computer';
import ReactTypingEffect from 'react-typing-effect';

import AceEditor from 'react-ace';
import NavBar from '../components/navbar';

// placeholder, will replace with our own NavBar
/* const MUIAppBar = () => {
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
}; */

const description = `
   ___  ____  ____         ___ ____  ____  ____  ____
  /  / /___/ /___  /\\  / /__    /   ____/   /   ____/
 /__/ /     /___  /  \\/  ___/  /   /___/   /   /___/   1.0

Statistics/Data Analysis

Welcome to OpenStata, an online text editor and tutorial
for learning Stata!

// What is Stata?

Stata is the proprietary statistical software used by most
economics departments.

Students interested in entering the field of economics —
either through becoming a research assistant or applying
to graduate school — are often expected to have working
knowledge of Stata.

While some well-resourced colleges and universities have
institutional licenses for Stata, many high school and
college students lack access to an institutional license 
or the funding to purchase Stata, creating yet another 
barrier to entry in a field that already struggles with 
diversity [1].

// What is OpenStata?

OpenStata is a free online text-editor that:
1. Provides tutorials to teach you the basics of Stata
2. Compiles, runs, and displays output for basic Stata
code
3. Allows you to store \`.do\` files (Stata programs),
\`.log\` files (Stata program output), and your own datasets

// How it's made!

OpenStata does not use Stata! Instead, we create our own
parser and implementation of Stata syntax relying largely
on the Nearly.js parsing toolkit [2] and econtools [3] 
python library. 

Footnotes!

[1] Bayer, Amanda, and Cecilia Elena Rouse. 2016.
"Diversity in the Economics Profession: A New Attack on
an Old Problem." Journal of Economic Perspectives, 30
(4): 221-42.
[2] "https://nearley.js.org/"
[3] "https://www.danielmsullivan.com/econtools/"


`;
const Welcome = (props) => {
  return (
    <div id="welcome-div">
      <NavBar />
      <div id="welcome-box">
        <div id="welcome-left-container">
          {/* <Typist> */}
          <AceEditor
            id="welcome-subtitle"
            placeholder="Enter code here"
            mode="jsx"
            theme="github"
            fontSize={14}
            value={description}
            highlightActiveLine={false}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2,
              displayIndentGuides: false,
            }}
            wrapEnabled
            height="100%"
            width="100%"
            readOnly
          />
          {/* <h2> */}
          {/* <span id="welcome-subtitle"> An online text editor with tutorials for learning Stata.</span> */}
          {/* </h2> */}
          {/* </Typist> */}
        </div>

        <div id="welcome-right-container">
          <ReactTypingEffect text="OPENSTATA" className="welcome-title" />
          { !props.authenticated ? (
            <div className="welcome-buttons">
              <IconButton component={NavLink} color="secondary" to="/signup">
                <Typography variant="body1" color="secondary">Sign Up</Typography>
                <Person color="secondary" />
              </IconButton>
              <IconButton component={NavLink} to="/signin">
                <Typography variant="body1" color="secondary">Sign In</Typography>
                <Person color="secondary" />
              </IconButton>
            </div>
          ) : (
            <div className="welcome-buttons">
              <IconButton component={NavLink} color="secondary" to="/home">
                <Typography variant="body1" color="secondary">Go to homepage </Typography>
                <Computer color="secondary" />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (reduxState) => ({
  authenticated: reduxState.auth.authenticated,
});

export default connect(mapStateToProps, null)(Welcome);
