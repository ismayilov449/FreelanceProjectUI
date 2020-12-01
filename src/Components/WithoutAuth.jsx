import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function WithoutAuth({ component: Component, ...rest }) {
  const token = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        <Component {...props} /> 
      }
    />
  );
}

export default WithoutAuth;
