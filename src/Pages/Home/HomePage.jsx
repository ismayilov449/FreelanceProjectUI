import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import validator from "validator";
import { signOut } from "../../Redux/Slicers/user.slice";
//actions
//components
import JobsList from "../Job/JobsList";
import { Link } from "react-router-dom";
import SearchFiltered from "../../Components/SearchFiltered";
import { Icon, Label, Segment, Button } from "semantic-ui-react";
import api from "../../Redux/api";

function HomePage({ jobs, operation, filters,subscribedFilters, ...props }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("homePage", subscribedFilters);
  }, []);
  function IsNullOrWhiteSpace(value) {
    if (value == null) return true;
    if (value == undefined) return true;
    if(value.toString()=="0") return true;
    return value.toString().replace(/\s/g, "").length == 0;
  }
  async function _subscribe(e){
    e.preventDefault();


    await api.subscription.subscribejob([subscribedFilters]);
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
  return (
    <div>
      {operation == "search" ? (
        <Segment
          style={{
            margin: "0px 200px 0px 200px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              {!IsNullOrWhiteSpace(filters.category) ? (
                <Label size="large" as="a" color="red" image>
                  <Icon name="search" />
                  Category: {filters.category}
                </Label>
              ) : (
                ""
              )}
              {!IsNullOrWhiteSpace(filters.city) ? (
                <Label size="large" as="a" color="red" image>
                  City: {filters.city}
                </Label>
              ) : (
                ""
              )}
              {!IsNullOrWhiteSpace(filters.education) ? (
                <Label size="large" as="a" color="red" image>
                  Education: {filters.education}
                </Label>
              ) : (
                ""
              )}
              {!IsNullOrWhiteSpace(filters.salary) ? (
                <Label size="large" as="a" color="red" image>
                  Salary:{filters.salary}
                </Label>
              ) : (
                ""
              )}
            </div>

            <Button onClick={_subscribe} secondary>Subscribe</Button>
          </div>
        </Segment>
      ) : (
        ""
      )}

      <JobsList jobs={jobs} operation={operation}></JobsList>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

HomePage.defaultProps = {};

export default HomePage;
