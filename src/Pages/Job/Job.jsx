import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const dispatch = useDispatch();
  const [job, setJob] = useState(jobModel.job);

  useEffect(() => {
    console.log(jobModel.job);
  }, {});

  function _onClick(e) {
    e.preventDefault();
    history.push("/details", job);
    console.log(job);
  }

  return (
    <Container>
      <Card
        className="ui red card"
        style={{
          height: "200px",
        }}
        onClick={(e) => _onClick(e)}
      >
        <CardContent className="content" style={{ background: "#f0dfdf" }}>
          <CardHeader className="header">{job.category}</CardHeader>
          <CardMeta className="meta">
            <h5 style={{ textDecoration: "underline" }}>{job.username}</h5>
          </CardMeta>
        </CardContent>
        <CardContent className="content">
          <CardDescription className="description">
            <a class="ui red label">
              {" "}
              {job.salaryMin} - {job.salaryMax} AZN
            </a>
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
