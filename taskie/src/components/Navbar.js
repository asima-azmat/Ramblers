import React, { Component } from "react";
import firebase, { db } from "firebase";
import { BrowserRouter as Redirect, Router, Route } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import logo from "../assets/Taskie.png";
import css from "../css/navbar.css";
import Button from "@material-ui/core/Button";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      userImage: ""
    };
  }
  componentDidMount() {
    let that = this;
    firebase.auth().onAuthStateChanged(function(currentUser){
      that.setState({ userImage: currentUser.photoURL, displayName: currentUser.displayName });
    })    
  };

  render() {
    return (
      <div className="nav-bar">
        <div className="logo">
          <img src={logo} alt="Logo" style={{ width: 150, height: 50 }} />
        </div>
        <div className="title">
          <h3>Team tasks in progress</h3>
        </div>
        <div className="user">
          <Avatar src={this.state.userImage}></Avatar>
          <h5>{this.state.displayName}</h5>
          <Button onClick={() => firebase.auth().signOut()}>Logout</Button>
        </div>
      </div>
    );
  }
}
export default Navbar;
