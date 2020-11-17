import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import validator from "validator";
import { signOut } from "../../Redux/Slicers/user.slice";
import Button from "../../Components/Button";
import {
  Item,
  ItemContent,
  ItemHeader,
  ItemMeta,
  ItemDescription,
} from "semantic-ui-react";

import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardMeta,
} from "semantic-ui-react";

//actions
//components

function JobDetail(jobModel) {
  const dispatch = useDispatch();
  const [job, setJob] = useState(jobModel.location.state);

  useEffect(() => {
    console.log(job);
  }, {});

  function _onClick(e) {
    e.preventDefault();

    console.log(job.id);
  }

  return <Container>{job.id}</Container>;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 5px;
`;

JobDetail.defaultProps = {};

export default JobDetail;
