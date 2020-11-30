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
import JobDetail from "./Pages/Job/JobDetail";
import CreateJob from "./Pages/Job/CreateJob";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Link } from "react-router-dom";

//api
import api from "./Redux/api";
//actions
import { signOut } from "../src/Redux/Slicers/user.slice";
import ProfilePage from "./Pages/Profile/ProfilePage";

function App(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [jobs, setJobs] = useState([]);
  const [operation, setOperation] = useState("all");
  const [filters, setFilters] = useState({});
  const [subscribedFilters, setSubscribedFilters]=useState({});
  if (history.location.pathname === "/") {
    history.push("/home");
  }

  if (history.location.pathname === "/auth") {
    return <WithoutAuth exact path="/auth" component={AuthPage} />;
  }

  async function _onClick(e) {
    // setLoading(true);
    e.preventDefault();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        await dispatch(signOut());
      } catch (err) {
        console.log(err);
        setErrors({
          email: "Server side error",
        });
      } finally {
        // setLoading(false);
      }
    } else {
      //setLoading(false);
    }
  }

  const setMainJobs = (filteredJobs) => {
    setJobs(filteredJobs);
  };

  const setMainOperation = (changedOperation) => {
    setOperation(changedOperation);
  };

  const setSelectedFilters = (givenFilters) => {
    setFilters(givenFilters);
  };

  return (
    <div className="pushable">
      <Header
        setjobs={setMainJobs}
        setOperation={setMainOperation}
        setFilters={setFilters}
        setSubscribedFilters={setSubscribedFilters}
      ></Header>
      <div class="pusher">
        <Fragment>
          <Switch>
            <WithAuth
              exact
              path="/home"
              component={(props) => (
                <HomePage
                  jobs={jobs}
                  operation={operation}
                  filters={filters}
                  subscribedFilters={subscribedFilters}
                  {...props}
                ></HomePage>
              )}
            />
            {/* Job */}
            <WithAuth exact path="/details" component={JobDetail} />
            <WithAuth exact path="/createJob" component={CreateJob} />
            <WithAuth exact path="/profile" component={ProfilePage} />

            <Route exact path="/404" component={NoAccessPage} />
            <Route exact path="*" component={NotFoundPage} />
          </Switch>
        </Fragment>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
