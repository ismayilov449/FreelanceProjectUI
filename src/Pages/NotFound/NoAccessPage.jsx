import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RiLockPasswordFill } from "react-icons/ri";

function NoAccessPage(props) {
  return (
    <Container>
      <RiLockPasswordFill size={164} color="#000" />
      <h3>no access</h3>
    </Container>
  );
}

NoAccessPage.defaultProps = {};

export default NoAccessPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  h3:last-child {
    margin-top: 10px;
    color: #084a62;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
`;
