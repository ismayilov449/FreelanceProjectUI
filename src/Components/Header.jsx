import React, { useState, useEffect } from "react";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { signOut } from "../Redux/Slicers/user.slice";
import { Link } from "react-router-dom";
import SearchFiltered from "./SearchFiltered";
import { Dropdown, Button, Icon } from "semantic-ui-react";
function Header({
  setjobs,
  setOperation,
  setFilters,
  setSubscribedFilters,
  ...props
}) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [connection, setConnection] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("None");

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:6001/hubs/operation")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      setConnectionStatus(connection.connectionState);
      connection
        .start()
        .then((result) => {
          console.log("Connected!");
          setConnectionStatus(connection.connectionState);

          connection.on("ReceiveNotification", (response) => {
            ReceiveNotification(response);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  const sendNotification = async (e) => {
    e.preventDefault();
    if (connection.connectionStarted) {
      try {
        await connection.invoke("SendNotification", "aueee").then(() => {});
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
  };

  const ReceiveNotification = (data) => {
    console.log(data);
  };

  async function _onClick(e) {
    e.preventDefault();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        await dispatch(signOut());
      } catch (err) {
        setErrors({
          email: "Server side error",
        });
      } finally {
      }
    } else {
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
          setFilters={setFilters}
          setSubscribedFilters={setSubscribedFilters}
        ></SearchFiltered>

        <div class="right menu">
          <Button
            color="black"
            icon
            style={{ marginTop: "-4px", marginRight: "15px" }}
          >
            <Icon name="send" onClick={(e) => sendNotification(e)} />
          </Button>
          <Dropdown text="UserName" style={{ marginTop: "5px" }}>
            <Dropdown.Menu>
              <Dropdown.Item text="Profile" />
              <Dropdown.Item text="Settings" d />
              <Dropdown.Item text="LogOut" onClick={(e) => _onClick(e)} />
              <Dropdown.Divider />
              <Dropdown.Item text="Help" />
            </Dropdown.Menu>
          </Dropdown>

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
