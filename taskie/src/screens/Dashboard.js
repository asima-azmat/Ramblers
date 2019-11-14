import React, { Component } from "react";
import { BrowserRouter as Redirect, Router, Route } from "react-router-dom";
import firebase, { db } from "firebase";
import Typography from "@material-ui/core/Typography";
import css from "../css/dashboard.css";
import { red } from "@material-ui/core/colors";
import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import addicon from "../assets/addicon.png";
import { Link, BrowserRouter } from "react-router-dom";
import Task from "../components/Task";
import ControlledPopup from "../components/ControlledPopup";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: firebase.auth().currentUser.uid,
      notification: false,
      listenToSnapshot: false
    };
  }
  componentDidMount = () => {
    var doc = firebase
      .firestore()
      .collection("User")
      .doc(this.state.userid);

    doc
      .get()
      .then(doc => {
        let that = this;

        firebase
          .firestore()
          .collection("Task")
          .where("company", "==", doc.data().company)
          .where("team", "==", doc.data().team)
          .onSnapshot(function(snapshot) {
            if (
              that.state.listenToSnapshot &&
              doc.data().createdby != firebase.firestore().currentuser.uid
            ) {
              snapshot.docChanges().forEach(function(change) {
                if (
                  change.type === "added" &&
                  change.doc.data().createdBy != doc.data().userid
                ) {
                  console.log("New task: ", change.doc.data());
                  that.setState({ notification: true });
                }
              });
            }
            that.setState({ listenToSnapshot: true });
          });
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  };

  render() {
    return (
      <div className="app">
        <Navbar></Navbar>
        <div className="screen">
          <div className="bar">
            <SideBar></SideBar>
          </div>
          {this.state.notification ? <ControlledPopup></ControlledPopup> : null}
          <div className="dashboard">
            <div className="column">
              <div className="help-title">
                <Typography component="h1" variant="h6" color="inherit" noWrap>
                  Help needed
                </Typography>
              </div>
              <div>
                <br></br>
                <Link to="/TaskForm">
                  <button>
                    <img src={addicon} style={{ width: 20, height: 20 }}></img>{" "}
                    Create a new task
                  </button>
                </Link>
              </div>
              <Task taskStatus="Help"></Task>
            </div>
            <div className="column">
              <div className="accepted-title">
                <Typography component="h1" variant="h6" color="inherit" noWrap>
                  Accepted
                </Typography>
              </div>
              <Task taskStatus="Accepted"></Task>
            </div>
            <div className="column">
              <div className="review-title">
                <Typography component="h1" variant="h6" color="inherit" noWrap>
                  To be reviewed
                </Typography>
              </div>
              <Task taskStatus="Review"></Task>
            </div>
            <div className="column">
              <div className="done-title">
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  style={{ backgroundColor: red }}
                >
                  Done
                </Typography>
              </div>
              <Task taskStatus="Done"></Task>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
