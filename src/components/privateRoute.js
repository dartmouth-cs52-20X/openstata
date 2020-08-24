/* eslint-disable react/jsx-props-no-spreading */
// from provided code for SA8
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Redirect } from 'react-router-dom';

// Router Wrapper
const PrivateRoute = ({ component: Child, ...props }) => {
  return (
    <Route
      {...props}
      render={(routeProps) => (props.authenticated ? (
        <Child {...routeProps} />
      ) : (
        <Redirect to="/signin" />
      ))}
    />
  );
};

const mapStateToProps = (reduxState) => ({
  authenticated: reduxState.auth.authenticated,
});

export default withRouter(connect(mapStateToProps, null)(PrivateRoute));
