import React, { Component, setState } from "react";
import firebase from "firebase";
import css from "../css/taskform.css";
//import { Link, BrowserRouter } from "react-router-dom";
import { Link } from "@material-ui/core";
import NewTaskPopup from "../components/NewTaskPopup.js";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskTitle: "",
      description: "",
      relatedRole: "",
      deadline: "",
      estimatedTime: "",
      userid: "",
      team: "",
      company: "",
      createdBy: "",
      createdByName: "",
      assignedTo: "",
      taskStatus: "",
      taskLink: "",
      tobeNotified: [],
      notification: false
    };
  }

  componentDidMount() {
    let that = this;

    firebase.auth().onAuthStateChanged(function(currentUser) {
      that.setState({ userid: currentUser.uid, email: currentUser.email, createdByName: currentUser.displayName });

      var doc = firebase
        .firestore()
        .collection("User")
        .doc(currentUser.uid);

      doc
        .get()
        .then(doc => {
          that.setState({
            createdBy: that.state.userid,
            createdByName: that.state.createdByName,
            taskStatus: "Help"
          });
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    });
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = event => {
    event.preventDefault();
    const tobeNotified = this.state.tobeNotified.concat(this.state.userid);
    this.setState({ notification: true });

    const {
      taskTitle,
      description,
      relatedRole,
      deadline,
      estimatedTime,
      company,
      team,
      createdBy,
      createdByName,
      assignedTo,
      taskStatus,
      taskLink
    } = this.state;

    firebase
      .firestore()
      .collection("Task")
      .add({
        taskTitle,
        description,
        relatedRole,
        deadline,
        estimatedTime,
        company,
        team,
        createdBy,
        createdByName,
        assignedTo,
        taskStatus,
        taskLink,
        tobeNotified
      })
      .then(docRef => {
        this.setState({
          taskTitle: "",
          description: "",
          relatedRole: "",
          deadline: "",
          estimatedTime: "",
          company: "",
          team: "",
          createdBy: "",
          createdByName: "",
          assignedTo: "",
          taskStatus: "",
          taskLink: "",
          tobeNotified: []
        });
        let that = this;

        setTimeout(function() {
          that.props.history.push("/Home");
        }, 2000);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  cancelHandler = event => {
    event.preventDefault();
    this.props.history.push("/Home");
  };

  render() {
    return (
      <div className="task">
        {this.state.notification ? (
          <NewTaskPopup taskOwner={this.state.owner}></NewTaskPopup>
        ) : null}
        <form onSubmit={this.submitHandler}>
          <label>Task</label>
          <br></br>
          <input type="text" name="taskTitle" onChange={this.changeHandler} />
          <br></br>
          <label>Description</label>
          <br></br>
          <input type="text" name="description" onChange={this.changeHandler} />
          <br></br>
          <label>Related Role</label>
          <br></br>
          <input type="text" name="relatedRole" onChange={this.changeHandler} />
          <br></br>
          <label>Deadline</label>
          <br></br>
          <input
            type="date"
            name="estimatedTime"
            onChange={this.changeHandler}
          />
          <br></br>
          <input type="text" name="deadline" onChange={this.changeHandler} />
          <br></br>
          <label>Link</label>
          <br></br>
          <input type="text" name="taskLink" onChange={this.changeHandler} />
          <br></br>
          <input
            name="submit"
            type="submit"
            value="Send the Help Request"
          ></input>
          <input
            name="cancel"
            type="submit"
            value="Cancel"
            onClick={this.cancelHandler}
          ></input>
        </form>
      </div>
    );
  }
}
export default TaskForm;
