/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrow from '@material-ui/icons/PlayArrow';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Save from '@material-ui/icons/Save';
import Clear from '@material-ui/icons/Clear';
import Description from '@material-ui/icons/Description';
import Collapse from '@material-ui/core/Collapse';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-noconflict/theme-github';
import { TextField } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import uploadFile from '../actions/s3';

import NavBar from '../components/navbar';
import {
  getDoFiles,
  getSingleDoFile,
  saveDoFile,
  saveURL,
  deleteDoFile,
  getLogFiles,
  getSingleLogFile,
} from '../actions';

const mapStateToProps = (reduxState) => ({
  dofiles: reduxState.dofiles,
  logfiles: reduxState.logfiles,
});

const drawerWidth = 248;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'grey',
    height: 'calc(100% - 295px)',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    backgroundColor: 'grey',
    display: 'flex',
    height: '100vh',
  },
  codeBar: {
    top: 'auto',
    bottom: 0,
  },
  fileWidgetButtons: {
    marginTop: 20,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  urlWidgetButtons: {
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
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

function CodeEditor(props) {
  const compEndRef = useRef(null);
  const headerText = `
  ___  ____  ____         ___ ____  ____  ____  ____ 
 /  / /___/ /___  /\\  / /__    /   ____/   /   ____/
/__/ /     /___  /  \\/  ___/  /   /___/   /   /___/   1.0

Statistics/Data Analysis`;

  const classes = useStyles();
  const [code, setCode] = useState('');
  const [compilation, setCompilation] = useState(headerText);
  const [sideBarInitialized, setSideBarInitialized] = useState(false);
  const [fileCollapse, setFileCollapse] = useState(true);
  const [logCollapse, setLogCollapse] = useState(false);

  // file/url widget state
  const [value, setValue] = useState(0);
  const [isFile, setIsFile] = useState(null);
  const [fileToUpload, setFileToUpload] = useState('');
  const [urlToUpload, setURLToUpload] = useState('');
  const [alias, setAlias] = useState('');

  const tabStyle = {
    minWidth: 124,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    color: 'black',
  };

  let doFiles = [];
  let logFiles = [];

  useEffect(() => {
    props.getSingleDoFile(props.match.params.fileid, null);
    props.getDoFiles(setSideBarInitialized);
    props.getLogFiles();
  }, []);

  useEffect(() => {
    setCode(props.dofiles.current.content);
  }, [props.dofiles.current]);

  useEffect(() => {
    console.log('should update log');
  }, [props.logfiles.current]);

  if (props.dofiles && sideBarInitialized) {
    doFiles = props.dofiles.all;
    logFiles = props.logfiles.all;
  }

  // handles widget tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 1) {
      setIsFile(true);
    } else {
      setIsFile(false);
    }
  };

  // when a file is chosen in file/url widget
  const onFileChosen = (event) => {
    const chosenFile = event.target.files[0];
    console.log('file chosen:', chosenFile);
    if (chosenFile) {
      setFileToUpload(chosenFile);
    }
  };

  // handles the situation where we are downloading by file
  const handleFileUpload = () => {
    if (fileToUpload && alias) {
      console.log('upload pressed and file exists');
      console.log('alias:', alias);
      uploadFile(fileToUpload)
        .then((url) => {
          const post = {
            fileName: alias,
            url,
          };
          console.log('post:', post);
          props.saveURL(post);
          // eslint-disable-next-line no-alert
          alert(`Successfully downloaded ${url} as ${alias}!`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // eslint-disable-next-line no-alert
      alert('error: Must choose file/url and alias');
    }
  };

  // handles the situation where we are downloading by URL
  const handleURLUpload = () => {
    // directly save the non-s3 url and alias to endpoint Jeff is creating
    if (urlToUpload && alias) {
      const post = {
        fileName: alias,
        url: urlToUpload,
      };
      console.log('post:', post);
      props.saveURL(post);
      // eslint-disable-next-line no-alert
      alert(`Successfully downloaded ${urlToUpload} as ${alias}!`);
    } else {
      // eslint-disable-next-line no-alert
      alert('error: Must choose file/url and alias');
    }
  };

  const runCode = () => {
    axios
      .post(
        'https://open-stata.herokuapp.com/api/parse',
        { dofile: code, tutorialID: null },
        {
          headers: { authorization: localStorage.getItem('token') },
        }
      )
      .then((res) => {
        setCompilation(
          `${compilation}\n\n-----------------------------\n\n${res.data.output.join(
            '\n\n'
          )}`
        );
      })
      .catch((err) => {
        setCompilation(
          `${compilation}\n\n-----------------------------\n\nError: ${err.response.data.output}`
        );
      });
  };

  const handleSave = () => {
    const post = {
      fileName: props.dofiles.current.fileName,
      content: code,
    };

    props.saveDoFile(post, props.dofiles.current.id, null);
  };

  const handleFileNav = (file) => {
    console.log('new file', file.content);
    props.history.push(`/editor/${file.id}`);
    props.getSingleDoFile(file.id, null);
  };

  const handleLogNav = (log) => {
    console.log('add functionality jared');
    // props.history.push(`/editor/${log.id}`);
    // props.getSingleLogFile(log.id, null);
  };

  const handleDelete = () => {
    props.deleteDoFile(props.dofiles.current.id, props.history);
  };

  // display different thing based on which tab is active in url/file widget
  return (
    <div className={classes.root}>
      <NavBar
        className={classes.appBar}
        page="editor"
        file={props.dofiles.current}
      />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className="drawerContainer">
          <ListItem button onClick={() => setFileCollapse(!fileCollapse)}>
            <ListItemText primary="Do Files" />
            {fileCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Divider />
          <Collapse in={fileCollapse} timeout="auto" unmountOnExit>
            <List>
              {doFiles.map((file) => (
                <ListItem
                  button
                  key={file.id}
                  onClick={() => handleFileNav(file)}
                >
                  <ListItemIcon>
                    <Description />
                  </ListItemIcon>
                  <ListItemText primary={file.fileName} />
                </ListItem>
              ))}
            </List>
          </Collapse>
          <Divider />
          <ListItem button onClick={() => setLogCollapse(!logCollapse)}>
            <ListItemText primary="Log Files" />
            {logCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Divider />
          <Collapse in={logCollapse} timeout="auto" unmountOnExit>
            <List>
              {logFiles.map((log) => (
                <ListItem button key={log.id} onClick={() => handleLogNav(log)}>
                  <ListItemIcon>
                    <Description />
                  </ListItemIcon>
                  <ListItemText primary={log.fileName} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
        <div className="file-widget">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            indicatorColor="primary"
          >
            <Tab style={tabStyle} label="Upload File" {...a11yProps(0)} />
            <Tab style={tabStyle} label="Upload URL" {...a11yProps(1)} />
          </Tabs>
          {isFile ? (
            <TabPanel value={value} index={1}>
              <form
                className={classes.urlWidgetButtons}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="URL"
                  onChange={(e) => setURLToUpload(e.target.value)}
                />
                <TextField
                  id="standard-basic"
                  label="Alias"
                  onChange={(e) => setAlias(e.target.value)}
                />
              </form>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
                onClick={handleURLUpload}
              >
                Upload
              </Button>
            </TabPanel>
          ) : (
            <TabPanel value={value} index={0}>
              <form
                className={classes.fileWidgetButtons}
                noValidate
                autoComplete="off"
              >
                <input type="file" name="uploadFile" onChange={onFileChosen} />
                <TextField
                  id="standard-basic"
                  label="Alias"
                  onChange={(e) => setAlias(e.target.value)}
                />
              </form>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
                onClick={handleFileUpload}
              >
                Upload
              </Button>
            </TabPanel>
          )}
        </div>
      </Drawer>
      <div className={classes.content}>
        <div className="compContainer">
          <AceEditor
            mode="jsx"
            value={compilation}
            height="100%"
            width="100%"
            showGutter={false}
            // eslint-disable-next-line react/jsx-boolean-value
            readOnly={true}
            highlightActiveLine={false}
            showPrintMargin={false}
          />
          <div ref={compEndRef} />
        </div>
        <div className="divider" />
        <div className="editorContainer">
          <AceEditor
            placeholder="Enter code here"
            mode="jsx"
            theme="github"
            onChange={(newCode) => setCode(newCode)}
            fontSize={14}
            value={code}
            highlightActiveLine={false}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2,
            }}
            height="100%"
            width="100%"
          />
          <AppBar position="fixed" className={classes.codeBar}>
            <Grid container direction="row" justify="flex-end">
              <IconButton onClick={() => handleDelete()}>
                <Typography variant="body1">Delete File</Typography>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => setCompilation(headerText)}>
                <Typography variant="body1">Clear Compilation</Typography>
                <Clear />
              </IconButton>
              <IconButton onClick={() => handleSave()}>
                <Typography variant="body1">Save Code</Typography>
                <Save />
              </IconButton>
              <IconButton onClick={() => runCode()}>
                <Typography variant="body1">Run Code</Typography>
                <PlayArrow />
              </IconButton>
            </Grid>
          </AppBar>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, {
  getDoFiles,
  getSingleDoFile,
  saveDoFile,
  saveURL,
  deleteDoFile,
  getLogFiles,
  getSingleLogFile,
})(CodeEditor);
