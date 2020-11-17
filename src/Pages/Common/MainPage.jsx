import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import JobsList from "../Job/JobsList";
import CreateJob from "../Job/CreateJob";

//actions
//components
import { Link } from "react-router-dom";

function MainPage() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  return <div></div>;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

MainPage.defaultProps = {};

export default MainPage;
