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

var queryresult = [];
function createTask(id, data) {
  return { ...data, taskid: id };
}

function getExcept(collectionname, property, filter) {
  return firebase
    .firestore()
    .collection(collectionname)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.docs.forEach(function(doc) {
        if (doc.data()[property]) {
          doc.data()[property].forEach(function(element) {
            if (element !== filter) {
              const newTask = createTask(doc.id, doc.data());
              queryresult.push(newTask);
            }
          });
        }
      });
      return true;
    });
}
function addUser(userid, taskId) {
  let task_not = firebase
    .firestore()
    .collection("Task")
    .doc(taskId);
  console.log(task_not);

  let tmp = firebase.firestore.FieldValue.arrayUnion(userid);

  var arrUnion = task_not.update({
    tobeNotified: tmp
  });
  console.log("added");
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: firebase.auth().currentUser.uid,
      notification: false,
      name: "",
      taskId: null
    };
  }
  componentDidMount = () => {
    let that = this;
    getExcept("Task", "tobeNotified", this.state.userid).then(function(value) {
      console.log(queryresult);
      that.setState({ notification: true });
      addUser(that.state.userid, queryresult[0].taskid);
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
