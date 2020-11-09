import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import validator from "validator";
import { signOut } from "../../Redux/Slicers/user.slice";
import Button from "../../Components/Button";
//actions
//components

function HomePage() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  async function _onClick(e) {
    // setLoading(true);
    e.preventDefault();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        await dispatch(signOut());
      } catch (err) {
        console.log(err);
        setErrors({
          email: "Server side error",
        });
      } finally {
        // setLoading(false);
      }
    } else {
      //setLoading(false);
    }
  }
  return (
    <Container>
      <h2>Giriş</h2>
      <Button
        text="Log out"
        color="white"
        bgColor="#084A62"
        onClick={_onClick}
        //disabled={loading}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

HomePage.defaultProps = {};

export default HomePage;
