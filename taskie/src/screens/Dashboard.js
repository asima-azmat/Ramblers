import React, { Component } from "react";
import firebase from "firebase";
import Typography from "@material-ui/core/Typography";
import css from "../css/dashboard.css";
import { red } from "@material-ui/core/colors";
import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import addicon from "../assets/addicon.png";
import { Link } from "react-router-dom";
import Task from "../components/Task";
import ControlledPopup from "../components/ControlledPopup";

var queryresult = [];
var isNElement = true;
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
function addUser(userid, taskId) {
  let task_not = firebase
    .firestore()
    .collection("Task")
    .doc(taskId);

  let tmp = firebase.firestore.FieldValue.arrayUnion(userid);
  var arrUnion = task_not.update({
    tobeNotified: tmp
  });
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      notification: false,
      taskId: null,
      owner: ""
    };
  }
  componentDidMount = () => {
    let that = this;

    firebase.auth().onAuthStateChanged(function(currentUser) {
      that.setState({ userid: currentUser.uid });
      getExcept("Task", "tobeNotified", that.state.userid).then(function(
        value
      ) {
        if (queryresult.length !== 0) {
          addUser(that.state.userid, queryresult[0].taskid);
          that.setState({ notification: true });
          queryresult = [];
        }
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
          {this.state.notification ? (
            <ControlledPopup taskOwner={this.state.owner}></ControlledPopup>
          ) : null}
          <div className="dashboard">
            <div className="column">
              <div className="help-title">
                <Typography component="h1" variant="h6" noWrap>
                  Help needed
                </Typography>
              </div>
              <div className="col-content">
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
                <Typography component="h1" variant="h6" noWrap>
                  Accepted
                </Typography>
              </div>
              <div className="col-content">
              <Task taskStatus="Typography"></Task>
              </div>
            </div>
            <div className="column">
              <div className="review-title">
                <Typography component="h1" variant="h6" noWrap>
                  To be reviewed
                </Typography>
              </div>
              <div className="col-content">
              <Task taskStatus="Review"></Task>
              </div>
            </div>
            <div className="column">
              <div className="done-title">
                <Typography
                  component="h1"
                  variant="h6"
                  noWrap
                  style={{ backgroundColor: red }}
                >
                  Done
                </Typography>
              </div>
              <div className="col-content">
              <Task taskStatus="Done"></Task>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
