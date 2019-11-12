import React, {useState, useEffect} from "react";
import firebase from "firebase";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    border: 5,
  },
  title: {
    fontSize: 14,
  },
});


function Task() {
  const classes = useStyles();
  const [task,setTask] = useState([]);
  const taskArray = [];
   useEffect(() => {
    firebase.firestore().collection('Task').get()
    .then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        //doc.data();
       taskArray.push(doc.data());
      });
      setTask(taskArray);
   });
   }, []);

  
   console.log(task);
   console.log(task.deadline);

  //Rendering the Task card
  return (
    <div className="task-card">
      {
        task.map((taskObject, index) => {
          return(
            <div key = {`${index}`}>
              <br></br>
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Created By: {taskObject.createdBy}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    Title: {taskObject.taskTitle}
                  </Typography>
                  <Typography color="textSecondary">
                    Deadline: {taskObject.deadline}
                  </Typography>
                  <Typography variant="body2" component="p">
                  </Typography>
                </CardContent>
            </Card>
            <br></br>
            </div>

          );
        })
      }
      {/* <div>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Created By: {task.createdBy}
            </Typography>
            <Typography variant="h5" component="h2">
              Title: {task.taskTitle}
            </Typography>
            <Typography color="textSecondary">
              Deadline: {task.deadline}
            </Typography>
            <Typography variant="body2" component="p">
            </Typography>
          </CardContent>
       </Card>
      </div> */}
    </div>
  );
}
export default Task;