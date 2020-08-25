/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
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
import { NavLink, withRouter } from 'react-router-dom';

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
          <Typography component="div">{children}</Typography>
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: 220,
    backgroundColor: theme.palette.background.paper,
  },

  labelContainer: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  ListItem: {
    width: '100%',
  },
}));

function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [isTutorial, setIsTutorial] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
    if (newValue === 1) {
      setIsTutorial(true);
      console.log('isTutorial = true');
    } else {
      setIsTutorial(false);
      console.log('isTutorial = false');
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
      <div className="homepage-container">
        <div className="sidebar">
          <div className={classes.root}>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab style={tabStyle} label="Tutorials" {...a11yProps(0)} />
              <Tab style={tabStyle} label="Projects" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <List className={classes.ListItem} component="nav" aria-label="tutorials">
                <ListItem button onClick={() => { console.log('onClick'); }}>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="Tutorial Module 1" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="Tutorial Module 2" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="Tutorial Module 3" />
                </ListItem>
              </List>
            </TabPanel>

          </div>
        </div>
        <div className="main-page">
          <div className="main-page-title">
            <h1>Tutorials:</h1>
          </div>
          <div className="lessons-container">
            <div className="full-name-edit-btn">
              <Fab component={NavLink}
                to="/editor"
                variant="extended"
                color="primary"
                aria-label="add"
                className="edit-btn"
              >
                Lesson 1.1: Basic Commands
              </Fab>
            </div>
            <div className="full-name-edit-btn">
              <Fab variant="extended" color="primary" aria-label="add" className="edit-btn">
                Lesson 1.2:  Data Import/Export Commands
              </Fab>
            </div>
            <div className="full-name-edit-btn">
              <Fab variant="extended" color="primary" aria-label="add" className="edit-btn">
                Lesson 1.3: Data Transformation
              </Fab>
            </div>
            <div className="full-name-edit-btn">
              <Fab variant="extended" color="primary" aria-label="add" className="edit-btn">
                Lesson 1.4: Data Analysis Commands
              </Fab>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="homepage-container">
        <div className="sidebar">
          <div className={classes.root}>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab style={tabStyle} label="Tutorials" {...a11yProps(0)} />
              <Tab style={tabStyle} label="Projects" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <List className={classes.ListItem} component="nav" aria-label="tutorials">
                <ListItem button>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="Tutorial Module 1" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="Tutorial Module 2" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="Tutorial Module 3" />
                </ListItem>
              </List>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <List component="nav" aria-label="projects">
                <ListItem button>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="Project Module 1" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="Project Module 2" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="Project Module 3" />
                </ListItem>
              </List>
            </TabPanel>
          </div>
        </div>
        <div className="main-page">
          <div className="main-page-title">
            <h1>Projects:</h1>
          </div>
          <div className="lessons-container">
            <div className="full-name-edit-btn">
              <Fab variant="extended" color="primary" aria-label="add" className="edit-btn">
                Test Project
              </Fab>
            </div>
            <div className="full-name-edit-btn">
              <Fab variant="extended" color="primary" aria-label="add" className="edit-btn">
                Play with data
              </Fab>
            </div>
            <div className="full-name-edit-btn">
              <Fab variant="extended" color="primary" aria-label="add" className="edit-btn">
                Group project
              </Fab>
            </div>
            <div className="full-name-edit-btn">
              <Fab variant="extended" color="primary" aria-label="add" className="edit-btn">
                Other stuff
              </Fab>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SimpleTabs);
