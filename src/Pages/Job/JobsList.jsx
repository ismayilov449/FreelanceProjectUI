import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import validator from "validator";
import { signOut } from "../../Redux/Slicers/user.slice";
import Button from "../../Components/Button";
//actions
//components

function JobsList(job) {
    const dispatch = useDispatch();
   // const translation = useSelector((state) => state.translation.selected.messages);
  
    //state
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowCount, setRowCount] = useState({ value: '20', label: '20' });
    const [data, setData] = useState([]);

  
    useEffect(() => {
      getOperations(rowCount, currentPage);
    }, []);
  
    function _onPageChange({ selected }) {
      setCurrentPage(selected + 1);
      getOperations(rowCount, selected + 1);
     // _onClean();
    }
  
    function _onRowCountChange(rc) {
      setCurrentPage(1);
      setRowCount(rc);
      getOperations(rc, 1);
     // _onClean();
    }
  
    async function getOperations(rc, currentPage) {
      setStatusCode(false);
  
      try {
        const offset = (currentPage - 1) * rc.value;
        const { list, totalCount } = await api.jobs.getall(offset, rc.value);
        setTotalCount(totalCount);
        setData(list);
        //setStatusCode(true);
      } catch (err) {
        console.log(err);
      }
    }
  
  return (
    <Container>

    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

JobsList.defaultProps = {};

export default JobsList;
