/* eslint-disable no-alert */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import StorageIcon from '@material-ui/icons/Storage';
import uploadFile from '../actions/s3';
import RunButton, { UploadButton } from '../components/custom-buttons';
import TabPanel, { a11yProps } from '../components/tabs';

import NavBar from '../components/navbar';
import {
  getDoFiles,
  getSingleDoFile,
  saveDoFile,
  saveURL,
  deleteDoFile,
  getLogFiles,
  getSingleLogFile,
  getData,
  runCompilation,
} from '../actions';

const mapStateToProps = (reduxState) => ({
  dofiles: reduxState.dofiles,
  logfiles: reduxState.logfiles,
  data: reduxState.data,
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
    backgroundColor: '#d2d2d2',
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
  const [fileCollapse, setFileCollapse] = useState(false);
  const [logCollapse, setLogCollapse] = useState(false);
  const [dataCollapse, setDataCollapse] = useState(false);
  const [sampleCollapse, setSampleCollapse] = useState(false);
  const [logMode, setLogMode] = useState(false);

  // file/url widget state
  const [value, setValue] = useState(0);
  const [isFile, setIsFile] = useState(null);
  const [fileToUpload, setFileToUpload] = useState('');
  const [urlToUpload, setURLToUpload] = useState('');
  const [alias, setAlias] = useState('');
  const [uploadAlert, setUploadAlert] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error');

  const [uploading, setUploading] = useState(false);
  const [runLoading, setRunLoading] = useState(false);

  const tabStyle = {
    minWidth: 124,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    color: 'black',
  };

  let doFiles = [];
  let logFiles = [];
  const dataFiles = [];
  const sampleFiles = [];

  useEffect(() => {
    props.getSingleDoFile(props.match.params.fileid, null);
    props.getSingleLogFile(props.match.params.fileid, null);
    props.getDoFiles(setSideBarInitialized);
    props.getLogFiles();
    props.getData();
  }, []);

  useEffect(() => {
    if (props.dofiles.current) {
      console.log('code mode');
      setCode(props.dofiles.current.content);
      setLogMode(false);
    }
  }, [props.dofiles.current]);

  useEffect(() => {
    if (props.logfiles.current) {
      console.log('log mode');
      setCode(props.logfiles.current.content);
      setLogMode(true);
    }
  }, [props.logfiles.current]);

  if (props.dofiles && sideBarInitialized) {
    doFiles = props.dofiles.all;
    logFiles = props.logfiles.all;
    props.data.all.forEach((df) => {
      if (df.user) {
        dataFiles.push(df);
      } else {
        sampleFiles.push(df);
      }
    });
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

  const handleAlert = (message, severity) => {
    setSnackbarMessage(message);
    setUploadAlert(true);
    setAlertSeverity(severity);
  };

  // when a file is chosen in file/url widget
  const onFileChosen = (event) => {
    const chosenFile = event.target.files[0];
    const fsize = chosenFile.size;

    // The file must be smaller than 10 megabytes (1e7)
    if (fsize > 10000000) {
      handleAlert(
        'The file selected is too big, please select a file less than 10MB',
        'error'
      );
    } else {
      console.log('file chosen:', chosenFile);
      if (chosenFile) {
        setFileToUpload(chosenFile);
      }
    }
  };

  // handles the situation where we are downloading by file
  const handleFileUpload = () => {
    if (fileToUpload && alias) {
      setUploading(true);
      uploadFile(fileToUpload)
        .then((url) => {
          const post = {
            fileName: alias,
            url,
          };
          setUploading(false);
          props.saveURL(post, handleAlert);

          // clears input
          setFileToUpload('');
          document.getElementById('fileInput').value = '';
          setAlias('');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      handleAlert('error: Must choose a file and give it an alias', 'error');
    }
  };

  // handles the situation where we are downloading by URL
  const handleURLUpload = () => {
    // directly save the non-s3 url and alias to endpoint Jeff is creating
    if (urlToUpload && alias) {
      setUploading(true);
      const post = {
        fileName: alias,
        url: urlToUpload,
      };
      setUploading(false);
      props.saveURL(post, handleAlert);

      // clears input
      setURLToUpload('');
      setAlias('');
    } else {
      handleAlert(
        'error: Must input a valid url and and give it an alias',
        'error'
      );
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setUploadAlert(false);
  };

  const runCode = () => {
    const tutorialID = props.dofiles.current.tutorialID
      ? props.dofiles.current.tutorialID
      : null;
    setRunLoading(true);
    runCompilation(
      code,
      tutorialID,
      compilation,
      setCompilation,
      setRunLoading
    );
  };

  const handleSave = () => {
    const post = {
      fileName: props.dofiles.current.fileName,
      content: code,
    };

    props.saveDoFile(post, props.dofiles.current.id, null);
  };

  const handleFileNav = (file) => {
    props.history.push(`/editor/${file.id}`);
    props.getSingleDoFile(file.id, null);
  };

  const handleLogNav = (log) => {
    props.history.push(`/editor/${log.id}`);
    props.getSingleLogFile(log.id, null);
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
        file={logMode ? props.logfiles.current : props.dofiles.current}
        isLog={logMode}
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
            <List dense>
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
            <List dense>
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
          <Divider />
          <ListItem button onClick={() => setSampleCollapse(!sampleCollapse)}>
            <ListItemText primary="Sample Data" />
            {sampleCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Divider />
          <Collapse in={sampleCollapse} timeout="auto" unmountOnExit>
            <List dense>
              {sampleFiles.map((data) => (
                <ListItem key={data.id}>
                  <ListItemIcon>
                    <StorageIcon />
                  </ListItemIcon>
                  <ListItemText primary={data.fileName} />
                </ListItem>
              ))}
            </List>
          </Collapse>
          <Divider />
          <ListItem button onClick={() => setDataCollapse(!dataCollapse)}>
            <ListItemText primary="Your Data" />
            {dataCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Divider />
          <Collapse in={dataCollapse} timeout="auto" unmountOnExit>
            <List dense>
              {dataFiles.map((data) => (
                <ListItem key={data.id}>
                  <ListItemIcon>
                    <StorageIcon />
                  </ListItemIcon>
                  <ListItemText primary={data.fileName} />
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
            indicatorColor="secondary"
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
                  value={urlToUpload}
                  id="standard-basic"
                  label="URL"
                  onChange={(e) => setURLToUpload(e.target.value)}
                  color="secondary"
                />
                <TextField
                  value={alias}
                  id="standard-basic"
                  label="Alias"
                  onChange={(e) => setAlias(e.target.value)}
                />
              </form>
              <UploadButton onClick={handleURLUpload} loading={uploading} />
            </TabPanel>
          ) : (
            <TabPanel value={value} index={0}>
              <form
                className={classes.fileWidgetButtons}
                noValidate
                autoComplete="off"
              >
                <input id="fileInput" type="file" name="uploadFile" onChange={onFileChosen} />
                <TextField
                  value={alias}
                  id="standard-basic"
                  label="Alias"
                  onChange={(e) => setAlias(e.target.value)}
                />
              </form>
              <UploadButton onClick={handleFileUpload} loading={uploading} />
            </TabPanel>
          )}
          <Snackbar
            open={uploadAlert}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <MuiAlert severity={alertSeverity} onClose={handleClose}>
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
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
            readOnly={logMode}
          />
          <AppBar position="fixed" className={classes.codeBar}>
            <Grid container direction="row" justify="flex-end">
              <IconButton onClick={() => handleDelete()} disabled={logMode}>
                <Typography variant="body1">Delete File</Typography>
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={() => setCompilation(headerText)}
                disabled={logMode}
              >
                <Typography variant="body1">Clear Compilation</Typography>
                <Clear />
              </IconButton>
              <IconButton onClick={() => handleSave()} disabled={logMode}>
                <Typography variant="body1">Save Code</Typography>
                <Save />
              </IconButton>
              <RunButton
                onClick={runCode}
                loading={runLoading}
                logMode={logMode}
              />
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
  getData,
})(CodeEditor);
