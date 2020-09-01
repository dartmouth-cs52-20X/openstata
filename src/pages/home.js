/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
/* import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder'; */
import Fab from '@material-ui/core/Fab';
import { NavLink } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';

import NavBar from '../components/navbar';
// import TutorialOptions from '../components/tutorialOptions';

import { getDoFiles, createDoFile, getTutorialFiles } from '../actions';

const mapStateToProps = (reduxState) => ({
  dofiles: reduxState.dofiles.all,
  tutorials: reduxState.dofiles.tutorials,
});

const drawerWidth = 248;

// temporary until we set up the database...
/* const data = {
  content: {
    tutorials: [
      {
        mod: {
          name: 'Introduction',
          options: [
            {
              tutorialName: 'Lesson 1.1: Getting Started',
              content: 'tutorial goes here',
            },
            {
              tutorialName: 'Lesson 1.2: Basic Commands',
              content: 'tutorial goes here',
            },
            {
              tutorialName: 'Lesson 1.3: Data Import/Export',
              content: 'tutorial goes here',
            },
          ],
        },
      },
      {
        mod: {
          name: 'Intermediate',
          options: [
            {
              tutorialName: 'Lesson 2.1: Data Transformation Commands',
              content: 'tutorial goes here',
            },
            {
              tutorialName: 'Lesson 2.1: Data Analysis Commands',
              content: 'tutorial goes here',
            },
            {
              tutorialName: 'Lesson 2.1: Graphing Commands',
              content: 'tutorial goes here',
            },
          ],
        },
      },
      {
        mod: {
          name: 'Bonus',
          options: [
            {
              tutorialName: 'Lesson 3.1: Bonus 1',
              content: 'tutorial goes here',
            },
            {
              tutorialName: 'Lesson 3.2: Bonus 2',
              content: 'tutorial goes here',
            },
            {
              tutorialName: 'Lesson 3.3: Bonus 3',
              content: 'tutorial goes here',
            },
          ],
        },
      },
    ],

    projects: [
      {
        mod: {
          name: 'My Do Files',
          options: [
            {
              projectName: 'Hello world',
              content: 'My first file',
            },
            {
              projectName: 'Test file',
              content: 'Some other file',
            },
            {
              projectName: 'Example file',
              content: 'A file',
            },
          ],
        },
      },
      {
        mod: {
          name: 'Other Do Files',
          options: [
            {
              projectName: 'Project Mod 2 Project 1',
              content: 'Project goes here',
            },
            {
              projectName: 'Project Mod 2 Project 2',
              content: 'Project goes here',
            },
            {
              projectName: 'Project Mod 2 Project 3',
              content: 'Project goes here',
            },
          ],
        },
      },
    ],
  },
}; */

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

function TabPanel(props) {
  // eslint-disable-next-line object-curly-newline
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

/* function populateProjectModules() {
  return (
    <List className="listItem" component="nav" aria-label="projects">
      {data.content.projects.map((key) => (
        <ListItem button onClick={() => console.log('hello')}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary={key.mod.name} />
        </ListItem>
      ))}
    </List>
  );
} */

function HomePage(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [isTutorial, setIsTutorial] = useState(null);
  // const [displayModule, setDisplayModule] = useState('');
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    props.getDoFiles(props.getTutorialFiles, setInitialized);
  }, []);

  let doFilesList,
    tutorialsList;

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
      .sort((a, b) => Number(a.tutorialID) - Number(b.tutorialID))
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

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 1) {
      setIsTutorial(true);
    } else {
      setIsTutorial(false);
    }
  };

  const tabStyle = {
    minWidth: 124,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
  };

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
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab style={tabStyle} label="Tutorials" {...a11yProps(0)} />
              <Tab style={tabStyle} label="Do Files" {...a11yProps(1)} />
            </Tabs>
            {!isTutorial ? (
              <TabPanel value={value} index={0} />
            ) : (
              <TabPanel value={value} index={1} />
            )}
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

export default connect(mapStateToProps, { getDoFiles, createDoFile, getTutorialFiles })(HomePage);
