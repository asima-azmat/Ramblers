import React, { Component } from "react";
import firebase, { db } from "firebase";
import { BrowserRouter as Redirect, Router, Route } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import logo from "../assets/Taskie-white.png";
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
          <img src={logo} alt="Logo" />
        </div>

        <div className="title">
          <h3></h3>
        </div>

        <div className="user">
          <h5 className="navbar-name-h5">{this.state.displayName}</h5>
          <div avatar>
            <Avatar src={this.state.userImage}></Avatar>
          </div>
          <div className="logout">
            <Button 
            variant="contained"
            color="default"
            onClick={() => firebase.auth().signOut()}>
              Logout
              </Button>
          </div>
        </div>

      </div>
    );
  }
}
export default Navbar;
