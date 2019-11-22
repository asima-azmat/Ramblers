import React, { Component } from "react";
import firebase, { db } from "firebase";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import css from "../css/sidebar.css";
import { Link } from "react-router-dom";

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
          <div className="list-item"><img src={icon1} alt="icons" style={{ width: 30, height: 30 }}></img> TEAM DASHBOARD</div>
        <Link to="/Reward">
          <div className="list-item">
            <img src={icon2} alt="icons" style={{ width: 30, height: 30 }}/>
             MY FREE TIME
             </div>
             </Link>
          <div className="list-item"><img src={icon3} alt="icons" style={{ width: 30, height: 30 }}></img> MY TEAM</div>
        </div>

      </div>
    );
  }
}
export default SideBar;
