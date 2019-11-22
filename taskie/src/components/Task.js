import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    border: 5
  },
  title: {
    fontSize: 14
  }
});

function createTask(id, data) {
  return { ...data, taskid: id };
}

function Task(props) {
  const classes = useStyles();
  const { taskStatus } = props;
  const taskArray = [];
  const [task, setTask] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("Task")
      .where("taskStatus", "==", props.taskStatus)
      //.orderBy("deadline")
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          const newTask = createTask(doc.id, doc.data());
          taskArray.push(newTask);
        });
        setTask(taskArray);
      });
  }, []);
  switch (props.taskStatus) {
    case "Help":
      return (
        <div className="task-card">
          {task.map((taskObject, index) => {
            return (
              <div key={`${index}`} className="task-card">
                <br></br>
                <Card className={classes.card}>
                  <Link to={`/HelpTaskForm/${taskObject.taskid}`}>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {taskObject.taskTitle}
                      </Typography>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Created By: {taskObject.createdByName}
                      </Typography>
                      <Typography color="textSecondary">
                        Deadline: {taskObject.deadline}
                      </Typography>
                      <Typography variant="body2" component="p"></Typography>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            );
          })}
        </div>
      );
    case "Accepted":
      return (
        <div className="task-card">
          {task.map((taskObject, index) => {
            return (
              <div key={`${index}`} className="task-card">
                <br></br>
                <Card className={classes.card}>
                  <Link to={`/AcceptTaskForm/${taskObject.taskid}`}>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {taskObject.taskTitle}
                      </Typography>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Created By: {taskObject.createdByName}
                      </Typography>
                      <Typography color="textSecondary">
                        Deadline: {taskObject.deadline}
                      </Typography>
                      <Typography variant="body2" component="p"></Typography>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            );
          })}
        </div>
      );
    case "Review":
      return (
        <div className="task-card">
          {task.map((taskObject, index) => {
            return (
              <div key={`${index}`} className="task-card">
                <br></br>
                <Card className={classes.card}>
                  <Link to={`/ReviewTaskForm/${taskObject.taskid}`}>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {taskObject.taskTitle}
                      </Typography>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Created By: {taskObject.createdByName}
                      </Typography>
                      <Typography color="textSecondary">
                        Deadline: {taskObject.deadline}
                      </Typography>
                      <Typography variant="body2" component="p"></Typography>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            );
          })}
        </div>
      );
    case "Done":
      return (
        <div className="task-card">
          {task.map((taskObject, index) => {
            return (
              <div key={`${index}`} className="task-card">
                <br></br>
                <Card className={classes.card}>
                  <Link to={`/DoneTaskForm/${taskObject.taskid}`}>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {taskObject.taskTitle}
                      </Typography>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Created By: {taskObject.createdByName}
                      </Typography>
                      <Typography color="textSecondary">
                        Deadline: {taskObject.deadline}
                      </Typography>
                      <Typography variant="body2" component="p"></Typography>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            );
          })}
        </div>
      );
    default:
      return null;
  }
}
export default Task;
