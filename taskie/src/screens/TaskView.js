import React, { Component } from "react";
import firebase, { db } from "firebase";
import { BrowserRouter as Redirect, Router, Route } from "react-router-dom";

class TaskView extends Component {
  constructor(props) {
      super(props);
      this.state = {
          taskID: "",
          taskCreatedBy: "",
          taskTitle: "",
          taskDetails: "",
          taskDeadline: "",
          taskAttachedFile: "",
          taskAssignedTo: ""
      };
    }
    componentDidMount = () => {
      let tasksRef = db.collection('Task');
        let allTasks = tasksRef.get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              console.log(doc.id, '=>', doc.data());
            });
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
          
      /* var docRef = db.collection("Task").doc("KXSsTaZd56jJugUSexZO");
        docRef.get().then(function(doc) {
            if (doc.exists) {
              this.setState({ taskTitle: doc.data().taskTitle });
              this.setState({ taskDetails: doc.data().taskDetails });
              this.setState({ taskId: doc.data().id });
              console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        }); */
      };

render() {
    return(
        <div className="taskView">
                <h1>
                    List of Tasks for Marry
                </h1>

        </div>
    )
};

}

export default TaskView;