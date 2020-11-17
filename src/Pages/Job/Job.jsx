import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
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
import { Link } from "react-router-dom";

//actions
//components

function Job(jobModel) {
  const dispatch = useDispatch();
  const [job, setJob] = useState(jobModel.job);

  useEffect(() => {
    console.log(jobModel.job);
  }, {});
  async function _onClick(e) {
    console.log("edf");
    // setLoading(true);
    e.preventDefault();
    //setErrors(errors);
   // if (Object.keys(errors).length === 0) {
      try {
        await dispatch();
      } catch (err) {
       // console.log(err);
    //    setErrors({
      //    email: "Server side error",
        //});
      } finally {
        // setLoading(false);
      }
    //} else {
      //setLoading(false);
    //}
  }
  return (
    <Container>
      <Card
        className="ui red card"
        style={{
          height:"200px"
        }}
      >
        <CardContent className="content" style={{ background: "#f0dfdf" }}>
          <CardHeader className="header">{job.category}</CardHeader>
          <CardMeta className="meta">
            <h5 style={{ textDecoration: "underline" }}>{job.username}</h5>
          </CardMeta>
        </CardContent>
        <CardContent className="content">
          <CardDescription className="description">
          
            <a class="ui red label"> {job.salaryMin} - {job.salaryMax} AZN</a>

          </CardDescription>
          
        </CardContent>
        <CardContent className="extra content">
        <Link to="detail" class="ui right labeled icon button">    
                  <i class="right arrow icon"></i>

            Ətraflı
         </Link>
        </CardContent>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 5px;
`;

Job.defaultProps = {};

export default Job;
