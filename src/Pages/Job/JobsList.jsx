import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import validator from "validator";
import { signOut } from "../../Redux/Slicers/user.slice";
import Button from "../../Components/Button";
//actions
import api from "../../Redux/api";
//components
import Job from "../Job/Job";

function JobsList({ jobs, operation, ...props }) {
  const dispatch = useDispatch();
  // const translation = useSelector((state) => state.translation.selected.messages);

  //state
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowCount, setRowCount] = useState({ value: "20", label: "20" });
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(jobs);

    if (jobs.length == 0 && operation != "search") {
      getJobs(rowCount, currentPage);
    } else {
      setData(jobs);
      setTotalCount(jobs.count);
    }
  }, []);

  function _onPageChange({ selected }) {
    setCurrentPage(selected + 1);
    getJobs(rowCount, selected + 1);
    // _onClean();
  }

  function _onRowCountChange(rc) {
    setCurrentPage(1);
    setRowCount(rc);
    getJobs(rc, 1);
    // _onClean();
  }

  async function getJobs(rc, currentPage) {
    try {
      const offset = (currentPage - 1) * rc.value;
      const { list, totalCount } = await api.jobs.getall(offset, rc.value);
      setTotalCount(totalCount);
      setData(list);
      console.log(list);
      //setStatusCode(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      class="ui equal width grid"
      style={{
        margin: "20px 200px 20px 200px",
      }}
    >
      {data.map((job) => (
        <Job value={job.id} job={job}></Job>
      ))}
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

JobsList.defaultProps = {};

export default JobsList;
