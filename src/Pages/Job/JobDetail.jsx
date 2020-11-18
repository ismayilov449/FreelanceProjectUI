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
  //box-shadow: 0px 1px 0px 0px rgba(255,0,0,1);
  return (
    <div
      style={{
        boxShadow: "0px 1px 0px 0px rgba(255,0,0,1)",
        margin: "20px 200px 20px 200px",
      }}
    >
      <div
        class="ui two column centered grid"
        style={{ boxShadow: "0px 0px 5px 0px rgba(189,189,189,1)" }}
      >
        <div class="column">
          <div class="ui big label">
            {job.position} {job.category}
          </div>
          <br />
          <br />
          <div class="ui large label">
            <p style={{ textDecoration: "underline" }}> {job.username}</p>
          </div>
        </div>
        <div class="row">
          <a class="ui red big label">
            {job.salaryMin} - {job.salaryMax} AZN
          </a>
        </div>
        <div class=" ui three column grid  ">
          <br></br>
          <div class="row ui label">
            <div
              class="column"
              style={{
                color: "black ",
              }}
            >
              Şəhər:
            </div>
            <div class="column">{job.city}</div>
          </div>
          <div class="row ui label" style={{ background: "white" }}>
            <div
              class="column"
              style={{
                color: "black ",
              }}
            >
              Deadline:
            </div>
            <div class="column">
              {new Date(job.deadline).toLocaleDateString()}
            </div>
          </div>
          <div class="row ui label">
            <div
              class="column"
              style={{
                color: "black ",
              }}
            >
              Təhsil:
            </div>
            <div class="column">{job.education}</div>
          </div>
          <div class="row ui label" style={{ background: "white" }}>
            <div
              class="column"
              style={{
                color: "black ",
              }}
            >
              Təcrübə:
            </div>
            <div class="column">{job.experience}</div>
          </div>
          <div class="row ui label">
            <div
              class="column"
              style={{
                color: "black ",
              }}
            >
              Yaş:
            </div>
            <div class="column">
              {job.ageMin} - {job.ageMax}
            </div>
          </div>
          <div class="row ui label" style={{ background: "white" }}>
            <div
              class="column"
              style={{
                color: "black ",
              }}
            >
              Şirkət:
            </div>
            <div class="column">{job.companyName}</div>
          </div>
        </div>

        <div class="equal width row ">
          <div class="column">
            <div
              class="ui large label"
              style={{
                marginLeft: "150px ",
              }}
            >
              <div
                style={{
                  color: "black ",
                }}
              >
                Tələblər:
              </div>
              <br></br>
              <div>{job.requirements}</div>
            </div>
          </div>
          <div class="column">
            <div
              class=" ui large label"
              style={{
                marginRight: "150px",
                background: "white",
              }}
            >
              {" "}
              <div
                class="row"
                style={{
                  color: "black ",
                }}
              >
                İş barədə məlumat:
              </div>
              <br></br>
              <div class="row"> {job.description}</div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="ui label">
            Elanın tarixi:
            <div class="detail"> {new Date(job.publishedDate).toLocaleDateString()}</div>
          </div>
        </div>
        <div class="row">
          <div class="ui label">
            Bitmə tarixi:
            <div class="detail"> {new Date(job.endDate).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
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
