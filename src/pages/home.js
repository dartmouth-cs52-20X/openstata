/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DescriptionIcon from '@material-ui/icons/Description';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import BookIcon from '@material-ui/icons/Book';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import Fab from '@material-ui/core/Fab';
import { NavLink } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';

import NavBar from '../components/navbar';

import { getDoFiles, createDoFile, getTutorialFiles } from '../actions';

const mapStateToProps = (reduxState) => ({
  dofiles: reduxState.dofiles.all,
  tutorials: reduxState.dofiles.tutorials,
});

const drawerWidth = 248;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#d2d2d2',
  },
  files: {
    width: '100%',
  },
}));

function HomePage(props) {
  const classes = useStyles();
  const [isTutorial, setIsTutorial] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    props.getTutorialFiles(props.getDoFiles, setInitialized);
  }, []);

  let doFilesList, tutorialsList;

  const handleCreate = () => {
    const file = {
      fileName: `file${doFilesList.length}`,
      content: '// enter your commands here!',
    };

    props.createDoFile(file, props.history);
  };

  if (props.dofiles && initialized) {
    doFilesList = Object.entries(props.dofiles).map(([id, file]) => {
      return (
        <div className="full-name-edit-btn">
          <Fab
            className={classes.files}
            component={NavLink}
            to={`/editor/${file.id}`}
            variant="extended"
            aria-label="add"
          >
            {file.fileName}
          </Fab>
        </div>
      );
    });
    doFilesList.unshift(
      <div className="full-name-edit-btn create-btn">
        <Fab
          onClick={() => handleCreate()}
          className={classes.files}
          variant="extended"
          aria-label="add"
        >
          + Create new file
        </Fab>
      </div>
    );
    tutorialsList = Object.entries(props.tutorials)
      .sort((a, b) => {
        return a[1].tutorialID.localeCompare(b[1].tutorialID, 'en', {
          numeric: true,
        });
      })
      .map(([id, file]) => {
        return (
          <div className="full-name-edit-btn">
            <Fab
              className={classes.files}
              component={NavLink}
              to={`/editor/${file.id}`}
              variant="extended"
              aria-label="add"
            >
              {file.fileName}
            </Fab>
          </div>
        );
      });
  }

  return (
    <div>
      <NavBar className={classes.appBar} page="home" />
      <div className="homepage-container">
        <div className="sidebar">
          <Drawer
            variant="permanent"
            anchor="left"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <List>
              <ListItem button key={1} onClick={() => setIsTutorial(false)}>
                <ListItemIcon>
                  {!isTutorial ? <BookIcon /> : <BookOutlinedIcon />}
                </ListItemIcon>
                <ListItemText primary="Tutorials" />
              </ListItem>
              <ListItem button key={2} onClick={() => setIsTutorial(true)}>
                <ListItemIcon>
                  {isTutorial ? (
                    <DescriptionIcon />
                  ) : (
                    <DescriptionOutlinedIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary="Do Files" />
              </ListItem>
            </List>
          </Drawer>
        </div>
        {!isTutorial ? (
          <div className="main-page">
            <div className="main-page-title">
              <h1>Tutorials:</h1>
            </div>
            <div className="tutorials-container">{tutorialsList}</div>
          </div>
        ) : (
          <div className="main-page">
            <div className="main-page-title">
              <h1>Do Files:</h1>
            </div>
            <div className="do-files-container">{doFilesList}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, {
  getDoFiles,
  createDoFile,
  getTutorialFiles,
})(HomePage);
