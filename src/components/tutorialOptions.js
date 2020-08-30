/* eslint-disable comma-dangle */
import React from 'react';
import { NavLink } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';

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
              color="primary"
              aria-label="add"
              className="edit-btn"
            >
              {key.tutorialName}
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
              color="primary"
              aria-label="add"
              className="edit-btn"
            >
              {key.tutorialName}
            </Fab>
          </div>
        ))}
      </div>
    );
  }
};

export default TutorialOptions;
