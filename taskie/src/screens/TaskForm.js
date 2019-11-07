import React, { Component } from "react";
import firebase, { db } from "firebase";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskTitle: "",
      description: "",
      relatedRole: "",
      deadline: "",
      estimatedTime: ""
    };
  }


  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submitHandler = event => {
    event.preventDefault();
    const { taskTitle, description, relatedRole, deadline, estimatedTime } = this.state;
    console.log(taskTitle, description, relatedRole, deadline, estimatedTime);
    firebase
      .firestore()
      .collection("Task")
      .add({
        taskTitle, description, relatedRole, deadline, estimatedTime
      })
      .then(docRef => {
        this.setState({
          taskTitle: "",
          description: "",
          relatedRole: "",
          deadline: "",
          estimatedTime: ""
   
        });
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };
  render() {
    console.log("fuck you");
    return (
      <div className="task">
        <form onSubmit={this.submitHandler}>
          <h1>Task form!</h1>
          <label>Task title: </label>
          <input type="text" name="taskTitle" onChange={this.changeHandler} />
          <br></br>
          <label>Task Description: </label>
          <input type="text" name="description" onChange={this.changeHandler} />
          <br></br>
          <label>Related Role: </label>
          <input type="text" name="relatedRole" onChange={this.changeHandler} />
          <br></br>
          <label>Deadline: </label>
          <input type="text" name="deadline" onChange={this.changeHandler} />
          <br></br>
          <label>Estimated Time: </label>
          <input type="text" name="estimatedTime" onChange={this.changeHandler} />
          <br></br>
          {/* to be edited later.. 
          we also need to add one field to the state */}
          <p>Assigned by: [whoever creates the task]</p> 
          <input name="submit" type="submit" value="Send the Help Request"></input>
        </form>
      </div>
    );
  }
}
export default TaskForm;
