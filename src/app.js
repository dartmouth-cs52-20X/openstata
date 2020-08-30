import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './style.scss';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import PrivateRoute from './components/privateRoute';
import Welcome from './pages/welcome';
import SignUp from './components/signup';
import SignIn from './components/signin';
import Home from './pages/home';
import CodeEditor from './pages/codeEditor';
import Profile from './pages/profile';

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

const SigninModal = (props) => {
  return (
    <Dialog open>
      <DialogContent>
        <SignIn />
      </DialogContent>
    </Dialog>
  );
};

const SignupModal = (props) => {
  return (
    <Dialog open>
      <DialogContent>
        <SignUp />
      </DialogContent>
    </Dialog>
  );
};

// the signin and signup routes are inside the switch to keep the welcome page rendered
// the routes outside the switch are to render the actual modals
const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/signup" component={Welcome} />
          <Route path="/signin" component={Welcome} />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/editor/:fileid" component={CodeEditor} />
          <PrivateRoute path="/editor" component={CodeEditor} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route component={FallBack} />
        </Switch>
        <Route path="/signup" component={SignupModal} />
        <Route path="/signin" component={SigninModal} />
      </div>
    </Router>
  );
};

export default App;
