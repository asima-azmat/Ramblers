import React, { Component } from "react";
import firebase, { db } from "firebase";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskTitle: ""
    };
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submitHandler = event => {
    event.preventDefault();
    const { taskTitle } = this.state;
    console.log(taskTitle);
    firebase
      .firestore()
      .collection("Task")
      .add({
        taskTitle
      })
      .then(docRef => {
        this.setState({
          taskTitle: ""
        });
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
          <input type="text" name="taskTitle" onChange={this.changeHandler} />
          <input type="submit"></input>
        </form>
      </div>
    );
  }
}
export default TaskForm;
