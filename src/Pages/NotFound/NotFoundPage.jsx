import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiError } from "react-icons/bi";

function NotFoundPage(props) {
  // const translation = useSelector((state) => state.translation.selected.messages);
  const history = useHistory();

  return (
    <Container>
      <BiError size={164} color="#000" />
      <h3>Not Found</h3>
      <h3 onClick={() => history.goBack()}>goBack</h3>
    </Container>
  );
}

NotFoundPage.defaultProps = {};

export default NotFoundPage;

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
