import React, {Component, useState, useEffect} from "react";
import firebase from "firebase";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


function Task(props) {

  const [task,setTask] = useState([]);
   useEffect(() => {
    firebase.firestore().collection('Task').get()
    .then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
      console.log(doc.data());
      setTask(doc.data());
      });
   });
   }, []);

  //Rendering the Task card
    return (
      <div className="task-card">
            <div>
            <Card>
                <CardContent>
                <Typography color="textSecondary" gutterBottom>
                Created By: {task.taskCreatedBy}
                </Typography>
                <Typography variant="h5" component="h2">
                Task Title: {task.taskTitle}
                </Typography>
                <Typography color="textSecondary">
                Deadline:
                </Typography>
                <Typography variant="body2" component="p">
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
export default Task;