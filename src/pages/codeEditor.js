import React, { useState } from 'react';
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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'grey',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: 'grey',
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
  },
}));

function CodeEditor() {
  const classes = useStyles();
  const [code, setCode] = useState('');
  const [compilation, setCompilation] = useState('');

  const doFiles = ['Inbox', 'Starred', 'Send email', 'Drafts'];
  const otherData = ['All mail', 'Trash', 'Spam'];

  const runCode = () => {
    axios
      .get('https://open-stata.herokuapp.com/api/runcode')
      .then((res) => {
        setCompilation(res.data);
      })
      .catch((err) => {
        setCompilation(err);
      });
  };

  return (
    <div className="editorView">
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {doFiles.map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {otherData.map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.content}>
        <div className="comp">
          <p>{compilation}</p>
        </div>
        <div className="divider" />
        <div className="editorContainer">
          <AppBar position="static">
            <Grid container direction="row" justify="flex-end">
              <IconButton onClick={() => runCode()}>
                <Typography variant="body1">Run Code</Typography>
                <PlayArrow />
              </IconButton>
            </Grid>
          </AppBar>
          <AceEditor
            placeholder="Enter code here"
            mode="xml"
            theme="github"
            onChange={(newCode) => setCode(newCode)}
            fontSize={14}
            value={code}
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
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
