import React, { useState, useEffect } from "react";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { signOut } from "../Redux/Slicers/user.slice";
import { Link } from "react-router-dom";
import SearchFiltered from "./SearchFiltered";
import {
  Dropdown,
  Button,
  Icon,
  Menu,
  Label,
  MenuItem,
  List,
} from "semantic-ui-react";

import { Badge, OverlayTrigger, Tooltip, ListGroup } from "react-bootstrap";
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
  const [notifications, setNotifications] = useState([]);
  const [tmpNotification, setTmpNotification] = useState({});
  const [showNotification, setShowNotifications] = useState(false);
  const [notCounter, setNotCounter] = useState(0);

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
            setNotCounter(notifications.length);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  const ReceiveNotification = (data) => {
    var tmpData = {
      key: data.id,
      text: data.companyName,
      value: data.id,
    };
    notifications.push(tmpData);
    setNotifications(notifications);
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
          {/* <Button
            color="black"
            icon
            style={{ marginTop: "-4px", marginRight: "15px" }}
          >
            <Icon name="send" />
          </Button> */}

          <OverlayTrigger
            placement="bottom"
            show={showNotification}
            overlay={
              <ListGroup>
                {notifications.length != 0 ? (
                  notifications.map((item) => (
                    <ListGroup.Item action>{item.text}</ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item disabled>No Result</ListGroup.Item>
                )}
              </ListGroup>
            }
          >
            <Menu.Item
              as="a"
              style={{
                border: "1px #a5a5a5 solid",
                borderRadius: "5px",
                marginRight: "15px",
              }}
              onClick={() => setShowNotifications(!showNotification)}
            >
              <Icon name="bell" /> Notifications
              <Label color="red" size="mini" left floating>
                {notCounter}
              </Label>
            </Menu.Item>
          </OverlayTrigger>

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
