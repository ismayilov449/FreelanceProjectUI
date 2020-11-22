import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import validator from "validator";
import { signOut } from "../../Redux/Slicers/user.slice";
import Button from "../../Components/Button";
//actions
//components
import JobsList from "../Job/JobsList";
import { Link } from "react-router-dom";
import SearchFiltered from "../../Components/SearchFiltered";

function HomePage({ jobs, operation, ...props }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  useEffect(() => {}, []);

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
