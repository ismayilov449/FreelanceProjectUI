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
      <Card
        className="ui card"
        style={{
          margin: "5px",
          border: "2px darkorange solid",
          borderradius: "5px",
        }}
      >
        <CardContent className="content" style={{ background: "#D3D3D3" }}>
          <CardHeader className="header">{job.category}</CardHeader>
          <CardMeta className="meta">
            <h5 style={{ textDecoration: "underline" }}>{job.username}</h5>
          </CardMeta>
        </CardContent>
        <CardContent className="content">
          <CardDescription className="description">
            <h5 style={{ fontWeight: "bold" }}>
              {job.salaryMin} - {job.salaryMax} AZN
            </h5>
          </CardDescription>
          <CardDescription className="description">
            {job.description}
          </CardDescription>
          <CardDescription className="description">
            {job.requirements}
          </CardDescription>
        </CardContent>
        <CardContent className="extra content">
          <button class="ui right labeled icon button">
            <i class="right arrow icon"></i>
            Ətraflı
          </button>
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
