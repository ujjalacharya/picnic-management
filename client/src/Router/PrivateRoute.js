import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../Utils/Requests";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);

export default PrivateRoute;