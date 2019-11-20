import React, { Component } from "react";
import firebase, { db } from "firebase";
import Avatar from "@material-ui/core/Avatar";
import css from "../css/navbar.css";
import icon from "../assets/person.png";
import Badge from "@material-ui/core/Badge";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userImage: ""
    };
  }
  componentDidMount = () => {
    let that = this;
    firebase.auth().onAuthStateChanged(function(currentUser){
      that.setState({ userImage: currentUser.photoURL});
    }) 
  };

  render() {
    return (
      <div className="side-bar">
        <div className="elements-sidebar">
          <div className="elements-tasks">
            <img src={icon} alt="icons" style={{ width: 20, height: 20 }}></img>
            <h5>Team tasks</h5>
          </div>
          <div className="elements-tasks">
            <img src={icon} alt="icons" style={{ width: 20, height: 20 }}></img>
            <h5>My solved tasks</h5>
          </div>
        </div>
      </div>
    );
  }
}
export default SideBar;
