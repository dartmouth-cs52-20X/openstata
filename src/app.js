import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';
import './style.scss';
import Welcome from './pages/welcome';
import SignUp from './components/signup';
import SignIn from './components/signin';
import Home from './pages/home';
import CodeEditor from './pages/codeEditor';
import Profile from './pages/profile';

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <ModalRoute path="/signup" component={SignUp} />
          <ModalRoute path="/signin" component={SignIn} />
          <Route path="/home" component={Home} />
          <Route path="/editor" component={CodeEditor} />
          <Route path="/profile" component={Profile} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
