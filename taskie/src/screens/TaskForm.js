import React, { Component, useState, useEffect } from "react";
import firebase, { db } from "firebase";
import css from "../css/taskform.css";
import { Link, BrowserRouter } from "react-router-dom";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskTitle: "",
      description: "",
      relatedRole: "",
      deadline: "",
      estimatedTime: "",
      userid: firebase.auth().currentUser.uid,
      team: "",
      company: "",
      createdBy: "",
      assignedTo: ""
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
        this.setState({
          company: doc.data().company,
          team: doc.data().team,
          createdBy: this.state.userid
        });
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = event => {
    event.preventDefault();
    console.log(this.props);
    const {
      taskTitle,
      description,
      relatedRole,
      deadline,
      estimatedTime,
      company,
      team,
      createdBy,
      assignedTo
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
        assignedTo
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
          assignedTo: ""
        });
        console.log(this.props);
        this.props.history.push("/Home");
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };
  render() {
    return (
      <div className="task">
        <form onSubmit={this.submitHandler}>
          <h1>Task form!</h1>
          <label>Task title: </label>
          <br></br>
          <input type="text" name="taskTitle" onChange={this.changeHandler} />
          <br></br>
          <label>Task Description: </label>
          <br></br>
          <input type="text" name="description" onChange={this.changeHandler} />
          <br></br>
          <label>Related Role: </label>
          <br></br>
          <input type="text" name="relatedRole" onChange={this.changeHandler} />
          <br></br>
          <label>Deadline: </label>
          <br></br>
          <input type="text" name="deadline" onChange={this.changeHandler} />
          <br></br>
          <label>Estimated Time: </label>
          <br></br>
          <input
            type="date"
            name="estimatedTime"
            onChange={this.changeHandler}
          />
          <br></br>
          {/* to be edited later.. 
          we also need to add one field to the state */}
          <p>
            Assigned by:
            <br></br>
            {this.state.userid}
          </p>
          <input
            name="submit"
            type="submit"
            value="Send the Help Request"
          ></input>
        </form>
      </div>
    );
  }
}
export default TaskForm;
