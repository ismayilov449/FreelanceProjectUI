import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import validator from "validator";
import { signOut } from "../Redux/Slicers/user.slice";
import Button from "../Components/Button";
//actions
//components
import JobsList from "../Pages/Job/JobsList";
import { Link } from "react-router-dom";
import { Search } from "semantic-ui-react";
import SearchFiltered from "./SearchFiltered";

function Header({ setjobs, setOperation, ...props }) {
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
    <div class="ui inverted segment">
      <div class="ui inverted secondary pointing menu">
        <Link
          class="item"
          to="/home"
          onClick={(e) => {
            setOperation("all");
          }}
        >
          Home
        </Link>
        <Link class="item" to="/createJob">
          Share Job
        </Link>
        <SearchFiltered
          setOperation={setOperation}
          setjobs={setjobs}
        ></SearchFiltered>

        {/* <a class="item">Friends</a> */}
        <div class="right menu">
          <a class="item" onClick={_onClick}>
            Logout
          </a>
          <a class="item">Help</a>
          {/* <div class="item">
            <div class="ui icon input">
              <input type="text" placeholder="Search..."></input>
              <i class="search icon"></i>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

Header.defaultProps = {};

export default Header;
