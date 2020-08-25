/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import Fab from '@material-ui/core/Fab';
import { NavLink } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import NavBar from '../components/navbar';

import { getDoFiles } from '../actions';

// temporary until we set up the database...
const data = {
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
          name: 'Project Module 1',
          options: [
            {
              projectName: 'Project Mod 1 Project 1',
              content: 'Project goes here',
            },
            {
              projectName: 'Project Mod 1 Project 2',
              content: 'Project goes here',
            },
            {
              projectName: 'Project Mod 1 Project 3',
              content: 'Project goes here',
            },
          ],
        },
      },
      {
        mod: {
          name: 'Project Module 2',
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
      {
        mod: {
          name: 'Project Module 3',
          options: [
            {
              projectName: 'Project Mod 3 Project 1',
              content: 'Project goes here',
            },
            {
              projectName: 'Project Mod 3 Project 2',
              content: 'Project goes here',
            },
            {
              projectName: 'Project Mod 3 Project 3',
              content: 'Project goes here',
            },
          ],
        },
      },
    ],
  },
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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

function populateProjectOptions(moduleName) {
  let target = '';
  if (moduleName === undefined) {
    target = data.content.projects.find((el) => el.mod.name === 'Project Module 1');
    console.log('name was undefined!');
  } else {
    target = data.content.projects.find((el) => el.mod.name === moduleName);
    console.log('module was pressed. new target:');
    console.log(target);
  }

  return (
    <div className="lessons-container">
      {target.mod.options.map((key) => (
        <div className="full-name-edit-btn">
          <Fab component={NavLink}
            to="/editor"
            variant="extended"
            color="primary"
            aria-label="add"
            className="edit-btn"
          >
            {key.projectName}
          </Fab>
        </div>
      ))}
    </div>
  );
}

function populateProjectModules() {
  return (
    <List className="listItem" component="nav" aria-label="projects">
      {data.content.projects.map((key) => (
        <ListItem button onClick={() => populateProjectOptions(key.mod.name)}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary={key.mod.name} />
        </ListItem>
      ))}
    </List>
  );
}

function HomePage(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [isTutorial, setIsTutorial] = useState(null);
  const [displayModule, setDisplayModule] = useState('');

  console.log('token', localStorage.getItem('token'));

  useEffect(() => {
    console.log('asdf');
    props.getDoFiles();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 1) {
      setIsTutorial(true);
    } else {
      setIsTutorial(false);
    }
  };

  const populateTutorialOptions = () => {
    let target = '';
    if (displayModule) {
      target = data.content.tutorials.find((el) => el.mod.name === displayModule);
      return (
        <div className="lessons-container">
          {target.mod.options.map((key) => (
            <div className="full-name-edit-btn">
              <Fab component={NavLink}
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
      target = data.content.tutorials.find((el) => el.mod.name === 'Introduction');
      return (
        <div className="lessons-container">
          {target.mod.options.map((key) => (
            <div className="full-name-edit-btn">
              <Fab component={NavLink}
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

  const tabStyle = {
    minWidth: 110,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
  };

  if (!isTutorial) {
    return (
      <div>
        <NavBar className={classes.appBar} page="home" />
        <div className="homepage-container">
          <div className="sidebar">
            <Drawer
              variant="permanent"
              anchor="left"
            >
              <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab style={tabStyle} label="Tutorials" {...a11yProps(0)} />
                <Tab style={tabStyle} label="Projects" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <List className="listItem" component="nav" aria-label="tutorials">
                  {data.content.tutorials.map((key) => (
                    <ListItem button onClick={() => setDisplayModule(key.mod.name)}>
                      <ListItemIcon>
                        <FolderIcon />
                      </ListItemIcon>
                      <ListItemText primary={key.mod.name} />
                    </ListItem>
                  ))}
                </List>
              </TabPanel>
            </Drawer>
          </div>
          <div className="main-page">
            <div className="main-page-title">
              <h1>Tutorials:</h1>
            </div>
            {populateTutorialOptions()}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <NavBar className={classes.appBar} page="home" />
        <div className="homepage-container">
          <div className="sidebar">
            <Drawer
              variant="permanent"
              anchor="left"
            >
              <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab style={tabStyle} label="Tutorials" {...a11yProps(0)} />
                <Tab style={tabStyle} label="Projects" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={1}>
                {populateProjectModules()}
              </TabPanel>
            </Drawer>
          </div>
          <div className="main-page">
            <div className="main-page-title">
              <h1>Projects:</h1>
            </div>
            {populateProjectOptions()}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { getDoFiles })(HomePage);
