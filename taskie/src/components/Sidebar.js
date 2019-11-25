import React, { Component } from "react";
import firebase, { db } from "firebase";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import css from "../css/sidebar.css";
// import css from "../css/navbar.css";

import icon1 from "../assets/dashboard.png";
import icon2 from "../assets/freetime.png";
import icon3 from "../assets/team.png";

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

        <div className="holder"></div>
        
        <div>
          <div className="list-item"><img className="sidebar-list-icon" src={icon1} alt="icons" style={{ width: 30, height: 30 }}></img> TEAM DASHBOARD</div>
          <div className="list-item"><img className="sidebar-list-icon" src={icon2} alt="icons" style={{ width: 30, height: 30 }}></img> MY FREE TIME</div>
          <div className="list-item"><img className="sidebar-list-icon" src={icon3} alt="icons" style={{ width: 30, height: 30 }}></img> MY TEAM</div>
        </div>

      </div>
    );
  }
}
export default SideBar;
