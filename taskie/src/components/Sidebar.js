import React, { Component } from "react";
import firebase, { db } from "firebase";
import { BrowserRouter as Redirect, Router, Route } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import logo from "../assets/Taskie.png";
import css from "../css/navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {};
  // meanwhile we get the storage image
  userImage = `${firebase.auth().currentUser.photoURL}`;

  render() {
    return (
      <div className="nav-bar">
        <div className="logo">
          <img
            src={logo}
            alt="Logo"
            style={{ width: 150, height: 50, paddingTop: 10 }}
          />
        </div>
        <div className="title">
          <h3>TEAM TASKS IN PROGRESS</h3>
        </div>

        <div className="user">
          <Avatar src={this.userImage}></Avatar>
          <h5>{firebase.auth().currentUser.displayName}</h5>
        </div>
      </div>
    );
  }
}
export default Navbar;
