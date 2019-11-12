import React, {useState, useEffect} from "react";
import firebase from "firebase";
//import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


function Task() {

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
            <div key = {`${taskObject.createdBy}`}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
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