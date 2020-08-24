import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';
import './style.scss';
// import PrivateRoute from './components/privateRoute';
import Welcome from './pages/welcome';
import SignUp from './components/signup';
import SignIn from './components/signin';
import Home from './pages/home';
import CodeEditor from './pages/codeEditor';
// import Profile from './pages/profile';

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

// the signin and signup routes are inside the switch to keep the welcome page rendered
// the ModalRoutes are outside the switch to render the actual modals
const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/signup" component={Welcome} />
          <Route path="/signin" component={Welcome} />
          <Route path="/home" component={Home} />
          <Route path="/editor" component={CodeEditor} />
          <Route component={FallBack} />
        </Switch>
        <ModalRoute path="/signup" component={SignUp} />
        <ModalRoute path="/signin" component={SignIn} />
      </div>
    </Router>
  );
};

export default App;
