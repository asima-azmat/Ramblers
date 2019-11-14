import React, { Component } from "react";
import firebase from "firebase";
// import { BrowserRouter as Redirect, Router, Route } from "react-router-dom";
// import Typography from "@material-ui/core/Typography";
// import { red } from "@material-ui/core/colors";
// import Avatar from "@material-ui/core/Avatar";
// import logo from "../assets/Taskie.png";
import css from "../css/navbar.css";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {};
  // meanwhile we get the storage image
  userImage = `${firebase.auth().currentUser.photoURL}`;

  render() {
    return (
      <div className="side-bar">
        <div className="team-dashboard">
          <h3>TEAM DASHBOARD</h3>
        </div>
        <div className="my-notifications">
          <h3>MY NOTIFICATIONS</h3>
        </div>
        <div className="my-team">
          <h3>MY TEAM</h3>
        </div>
        <div className="my-me-time">
          <h3>MY ME TIME</h3>
        </div>
      </div>
    );
  }
}
export default SideBar;
