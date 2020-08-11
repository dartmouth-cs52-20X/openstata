import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './style.scss';
import Welcome from './pages/welcome';
import SignUp from './pages/signup';

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/signup" component={SignUp} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
