import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import validator from "validator";
import { signOut } from "../../Redux/Slicers/user.slice";
import Button from "../../Components/Button";
import { Image, Item } from 'semantic-ui-react'

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
       <Item>
      <Item.Content>
        <Item.Header as='a'>{job.category}</Item.Header>
  <Item.Meta className="color">{job.salaryMin} - {job.salaryMax} AZN</Item.Meta>
  <Item.Meta>{job.username}</Item.Meta>

      </Item.Content>
    </Item>
      {/* <h2>İş barədə</h2>
      <div> 
        <div> </div>
        <div></div>
      </div>
      <p>İşə götürən :{job.username}</p>
      <p>İş :{job.category}</p> */}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction:column
color{
  color:red
}
  `;

Job.defaultProps = {};

export default Job;
