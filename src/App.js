import React, { Fragment, useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
//private-route-layers
import WithAuth from "./Components/WithAuth";
import WithoutAuth from "./Components/WithoutAuth";
//pages
import NotFoundPage from "./Pages/NotFound/NotFoundPage";
import NoAccessPage from "./Pages/NotFound/NoAccessPage";
import AuthPage from "./Pages/Auth/AuthPage";
import HomePage from "./Pages/Home/HomePage";

//api
import api from "./Redux/api";
//actions

function App(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  if (history.location.pathname === "/") {
    history.push("/home");
  }

  if (history.location.pathname === "/auth") {
    return <WithoutAuth exact path="/auth" component={AuthPage} />;
  }

  return (
    <Fragment>
      <Switch>
        <WithAuth exact path="/home" component={HomePage} />

        <Route exact path="/404" component={NoAccessPage} />
        <Route exact path="*" component={NotFoundPage} />
      </Switch>
    </Fragment>
  );
}

export default App;
