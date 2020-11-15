import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import validator from "validator";
import { signOut } from "../../Redux/Slicers/user.slice";
import Button from "../../Components/Button";
//actions
//components

function Job(jobModel) {
  const dispatch = useDispatch();
  const [job, setJob] = useState(jobModel.job);

  useEffect(() => {
    console.log(jobModel.job);
  }, {});

  return (
    <Container>
      <h2>İş barədə</h2>
      <p>{job.username}</p>
      <p>{job.category}</p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

Job.defaultProps = {};

export default Job;
