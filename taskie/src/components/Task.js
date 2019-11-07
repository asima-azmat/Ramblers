import React, { Component } from "react";
import firebase, { db, firestore } from "firebase";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

class Task extends Component {
  
  //Constructor
  constructor(props) {
    super(props);
    this.state = {
      taskAssignedTo: "",
      taskAttachedFile: "",
      taskCreatedBy: "",
      taskDeadline: "",
      taskDetails: "",
      taskStatus: "",
      taskTitle: ""
    };
  }

  //Database
  showData = event => {
  event.preventDefault();
  const { taskAssignedTo, taskAttachedFile, taskCreatedBy, taskDeadline, taskDetails, taskStatus,  taskTitle} = this.state;
  const getRef = firebase
      .firestore()
      .collection("Task")
      .doc(`${firebase.auth().currentUser.uid}`);

  getRef.get().then(function(doc) {
      if (doc.exists) {
        console.log(doc.data().taskAssignedTo)
          doc.data().taskAssignedTo = taskAssignedTo;
          doc.data().taskCreatedBy = taskCreatedBy;
          doc.data().taskAttachedFile = taskAttachedFile;
          doc.data().taskDeadline = taskDeadline;
          doc.data().taskDetails = taskDetails;
          doc.data().taskStatus = taskStatus;
          doc.data().taskTitle = taskTitle;
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
  }
  //Rendering the Task card
  render() {
    return (
      <div className="task-card">
        <div>
        <Card>
            <CardContent>
            <Typography color="textSecondary" gutterBottom onMouseOver={this.showData}>
            Created By: {this.taskCreatedBy}
            </Typography>
            <Typography variant="h5" component="h2">
            Task Title
            </Typography>
            <Typography color="textSecondary">
            Deadline: November 9th, 2019 1 PM
            </Typography>
            <Typography variant="body2" component="p">
            Task details....
            <br />
            {'"a benevolent smile"'}
            </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
        </div>
      </div>
    );
  }
}
export default Task;
