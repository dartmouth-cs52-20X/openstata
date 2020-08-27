/* eslint-disable comma-dangle */
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
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-noconflict/theme-github';

import NavBar from '../components/navbar';
import { getDoFiles, getSingleDoFile, saveDoFile } from '../actions';

const mapStateToProps = (reduxState) => ({
  dofiles: reduxState.dofiles,
});

const drawerWidth = 160;

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

  let doFiles = [];

  useEffect(() => {
    props.getSingleDoFile(props.match.params.fileid, null);
    props.getDoFiles(setSideBarInitialized);
  }, []);

  useEffect(() => {
    setCode(props.dofiles.current.content);
  }, [props.dofiles]);

  if (props.dofiles && sideBarInitialized) {
    doFiles = props.dofiles.all;
  }

  const runCode = () => {
    axios
      .post('https://open-stata.herokuapp.com/api/parse', { dofile: code })
      .then((res) => {
        setCompilation(
          `${compilation}\n\n-----------------------------\n\n${res.data.output.join(
            '\n\n'
          )}`
        );
        compEndRef.current.scrollIntoView({ behavior: 'smooth' });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSave = () => {
    const post = {
      fileName: props.dofiles.current.fileName,
      content: code,
    };

    props.saveDoFile(post, props.dofiles.current.id);
  };

  const handleNav = (file) => {
    console.log('new file', file.content);
    props.history.push(`/editor/${file.id}`);
    props.getSingleDoFile(file.id, null);
  };

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <NavBar
        className={classes.appBar}
        page="editor"
        fileName={props.dofiles.current.fileName}
      />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerContainer}>
          <List>
            {doFiles.map((file) => (
              <ListItem button key={file.id} onClick={() => handleNav(file)}>
                <ListItemIcon>
                  <Description />
                </ListItemIcon>
                <ListItemText primary={file.fileName} />
              </ListItem>
            ))}
          </List>
          <Divider />
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
})(CodeEditor);
