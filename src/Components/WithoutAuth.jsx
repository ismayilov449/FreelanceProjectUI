import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function WithoutAuth({ component: Component, ...rest }) {
  const token = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        !token ? <Component {...props} /> : <Redirect to="/home" />
      }
    />
  );
}

export default WithoutAuth;
