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
import AcceptedTaskPopup from "../components/AcceptedTaskPopup";
import ReviewPopup from "../components/ReviewPopup";
import DonePopup from "../components/DonePopup";

var queryresult = [];
var taskId = null;
var user = null;
var statusFlag = "";

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
          if (!doc.data()[property].includes(filter)) {
            const newTask = createTask(doc.id, doc.data());
            queryresult.push(newTask);
          }
        }
      });
      return true;
    });
}

function addUser(userid, id) {
  let task_not = firebase
    .firestore()
    .collection("Task")
    .doc(id);

  let tmp = firebase.firestore.FieldValue.arrayUnion(userid);
  var arrUnion = task_not.update({
    tobeNotified: tmp
  });
  taskId = id;
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      newTasknotification: false,
      taskId: null,
      acceptedNotification: false,
      doneNotification: false,
      reviewNotification: false
    };
  }

  notNotified(status, taskStatus, property, createdBy) {
    let that = this;
    firebase
      .firestore()
      .collection("Task")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.docs.forEach(function(doc) {
          if (!doc.data()[property]) {
            if (
              doc.data()[taskStatus] === status &&
              doc.data()[createdBy] === user
            ) {
              let task_not = firebase
                .firestore()
                .collection("Task")
                .doc(doc.id);
              switch (status) {
                case "Accepted":
                  task_not
                    .update({
                      acceptedNotification: true
                    })
                    .then(function() {
                      that.setState({ acceptedNotification: true });
                    })
                    .catch(function(error) {
                      console.error("Error updating document: ", error);
                    });
                  break;
                case "Review":
                  task_not
                    .update({
                      reviewNotification: true
                    })
                    .then(function() {
                      that.setState({ reviewNotification: true });
                    })
                    .catch(function(error) {
                      console.error("Error updating document: ", error);
                    });
                  break;
                case "Done":
                  task_not
                    .update({
                      doneNotification: true
                    })
                    .then(function() {
                      that.setState({ doneNotification: true });
                    })
                    .catch(function(error) {});
                  break;
              }
            }
          }
        });
      });
  }

  componentDidMount = () => {
    let that = this;

    firebase.auth().onAuthStateChanged(function(currentUser) {
      user = currentUser.uid;
      that.setState({ userid: currentUser.uid });
      firebase
        .firestore()
        .collection("Task")
        .onSnapshot(function(snapshot) {
          snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
              getExcept("Task", "tobeNotified", that.state.userid).then(
                function(value) {
                  if (queryresult.length !== 0) {
                    addUser(that.state.userid, queryresult[0].taskid);
                    that.setState({
                      newTasknotification: true
                    });
                    queryresult = [];
                  }
                }
              );
            }
            if (change.type === "modified") {
              taskId = change.doc.id;
              that.notNotified(
                "Accepted",
                "taskStatus",
                "acceptedNotification",
                "createdBy"
              );

              that.notNotified(
                "Review",
                "taskStatus",
                "reviewNotification",
                "createdBy"
              );

              that.notNotified(
                "Done",
                "taskStatus",
                "doneNotification",
                "idAcceptedBy"
              );
            }
          });
        });
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
          {this.state.newTasknotification ? (
            <ControlledPopup taskId={taskId}></ControlledPopup>
          ) : null}
          {this.state.acceptedNotification ? (
            <AcceptedTaskPopup taskId={taskId}></AcceptedTaskPopup>
          ) : null}
          {this.state.reviewNotification ? (
            <ReviewPopup taskId={taskId}></ReviewPopup>
          ) : null}
          {this.state.doneNotification ? (
            <DonePopup taskId={taskId}></DonePopup>
          ) : null}

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
                  <button className="button-new-task">
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
