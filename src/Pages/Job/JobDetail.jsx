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
import api from "../../Redux/api";

//actions
//components

function Job(jobModel) {
  const dispatch = useDispatch();
  // const translation = useSelector((state) => state.translation.selected.messages);

  //state
  const [id, setId] = useState("b3c6d38f-8f6a-4b09-ab34-0d06f3e4c482");
  const [data, setData] = useState([]);

  useEffect(() => {
    getOperations(id);
  }, []);


  async function getOperations(id) {
    try {
      const { list } = await api.jobs.getbyid(id);
      setData(list);
      console.log("efewfewfw")
      console.log(list);
      //setStatusCode(true);
    } catch (err) {
      console.log(err);
    }
  }
  async function _onClick(e) {
    // setLoading(true);
    e.preventDefault();
   console.log("dwdfe");
  }
  return (
    
<div class="ui two column centered grid">
  <div class="column"></div>
  <div class="four column centered row">
    <div class="column">{data.position}</div>
    <div class="column"></div>
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

Job.defaultProps = {};

export default Job;
