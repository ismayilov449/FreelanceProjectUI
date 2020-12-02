import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../Redux/Utils/auth.utils";

function WithoutAuth({ component: Component, ...rest }) {
  const token = getToken();

  return (
    <Route
      {...rest}
      //render={(props) => <Component {...props} />}
      render={(props) =>
        !token ? <Component {...props} /> : <Redirect to="/auth" />
      }
    />
  );
}

export default WithoutAuth;
