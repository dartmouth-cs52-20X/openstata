/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../components/navbar';

// temporary until we set up the database...
const data = {
  content: {
    tutorials: [
      {
        mod: {
          name: 'Tutorial Module 1',
          options: [
            {
              tutorialName: 'Tutorial Mod 1 Tutorial 1',
              content: 'tutorial goes here',
            },
            {
              tutorialName: 'Tutorial Mod 1 Tutorial 2',
              content: 'tutorial goes here',
            },
            {
              tutorialName: 'Tutorial Mod 1 Tutorial 3',
              content: 'tutorial goes here',
            },
          ],
        },
      },
      {
        mod: {
          name: 'Tutorial Module 2',
          options: [
            {
              tutorialName: 'Tutorial Mod 2 Tutorial 1',
              content: 'tutorial goes here',
            },
            {
              tutorialName: 'Tutorial Mod 2 Tutorial 2',
              content: 'tutorial goes here',
            },
            {
              tutorialName: 'Tutorial Mod 2 Tutorial 3',
              content: 'tutorial goes here',
            },
          ],
        },
      },
      {
        mod: {
          name: 'Tutorial Module 3',
          options: [
            {
              tutorialName: 'Tutorial Mod 3 Tutorial 1',
              content: 'tutorial goes here',
            },
            {
              tutorialName: 'Tutorial Mod 3 Tutorial 2',
              content: 'tutorial goes here',
            },
            {
              tutorialName: 'Tutorial Mod 3 Tutorial 3',
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
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    backgroundColor: 'grey',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    backgroundColor: 'grey',
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
  },
}));

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

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

function populateTutorialOptions(moduleName) {
  let target = '';
  if (moduleName === undefined) {
    target = data.content.tutorials.find((el) => el.mod.name === 'Tutorial Module 1');
    console.log('no module selected. module name was undefined!');
  } else {
    target = data.content.tutorials.find((el) => el.mod.name === moduleName);
    console.log('module was pressed. new target:');
    console.log(target);
  }

  // Not working
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

function populateProjectOptions(moduleName) {
  const target = data.content.projects.find((el) => el.mod.name === moduleName);
  console.log(target);

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

function populateTutorialModules() {
  return (
    <List className="listItem" component="nav" aria-label="tutorials">
      {data.content.tutorials.map((key) => (
        <ListItem button onClick={() => populateTutorialOptions(key.mod.name)}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary={key.mod.name} />
        </ListItem>
      ))}
    </List>
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

export default function HomePage() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [isTutorial, setIsTutorial] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 1) {
      setIsTutorial(true);
    } else {
      setIsTutorial(false);
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
                {populateTutorialModules()}
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
            {populateProjectOptions('Project Module 1')}
          </div>
        </div>
      </div>
    );
  }
}
