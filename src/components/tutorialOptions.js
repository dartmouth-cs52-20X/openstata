/* eslint-disable comma-dangle */
import React from 'react';
import { NavLink } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';

const TutorialOptions = (props) => {
  let target = '';
  if (props.displayModule) {
    target = props.data.content.tutorials.find(
      (el) => el.mod.name === props.displayModule
    );
    return (
      <div className="lessons-container">
        {target.mod.options.map((key) => (
          <div className="full-name-edit-btn">
            <Fab
              component={NavLink}
              to="/editor"
              variant="extended"
              aria-label="add"
              className="edit-btn"
            >
              <Typography>{key.tutorialName}</Typography>
            </Fab>
          </div>
        ))}
      </div>
    );
  } else {
    target = props.data.content.tutorials.find(
      (el) => el.mod.name === 'Introduction'
    );
    return (
      <div className="lessons-container">
        {target.mod.options.map((key) => (
          <div className="full-name-edit-btn">
            <Fab
              component={NavLink}
              to="/editor"
              variant="extended"
              aria-label="add"
              className="edit-btn"
            >
              <Typography>{key.tutorialName}</Typography>
            </Fab>
          </div>
        ))}
      </div>
    );
  }
};

export default TutorialOptions;
