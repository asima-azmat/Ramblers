import firebase from "firebase";
import css from "../css/taskform.css";
import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";

function HelpTaskForm (props) {
  
  let { id } = useParams();
  const [task,setTask] = useState([]);
   useEffect(() => {
    const taskData = firebase.firestore().collection('Task').doc(id)
    taskData.get().then(function(doc) {
      setTask(doc.data());
    })
   }, []);

   const reviewHandler = event => {
    event.preventDefault();
    firebase.firestore().collection('Task').doc(id).update({taskStatus: "Review"});
    props.history.push("/Home");
   };

   const cancelHandler = event => {
    event.preventDefault();
    props.history.push("/Home");
   };

   return (
    <div className="task">
      <form>
        <label>Task</label>
        <br></br>
        <input disabled type="text" name="taskTitle" value = {task.taskTitle} />
        <br></br>
        <label>Description</label>
        <br></br>
        <textarea disabled name="description" value = {task.description} />
        <br></br>
        <label>Related Role</label>
        <br></br>
        <input disabled type="text" name="relatedRole" value = {task.relatedRole} />
        <br></br>
        <label>Deadline</label>
        <br></br>
        <input
          disabled
          type="date"
          name="estimatedTime"
          value = {task.estimatedTime}
        />
        <br></br>
        <input disabled type="text" name="deadline" value = {task.deadline} />
        <br></br>
        <label>Link</label>
          <br></br>
          <input type="text" name="taskLink" value={task.taskLink} />
          <br></br>
        <p>
          Created by
          <br></br>
          {task.createdBy}
        </p>
        <label>Solution</label>
        <br></br>
        <textarea name="solution"/>
        <br></br>
        <label>Solution Link</label>
          <br></br>
          <input type="text" name="solutionLink"/>
          <br></br>
          <br></br>
        <Link to="/Home">
        <input
          name="review"
          type="submit"
          value="Send to Review"
          onClick= {reviewHandler}
        ></input>
        </Link>
        <Link to="/Home">
        <input
          name="cancel"
          type="submit"
          value="Cancel"
          onClick= {cancelHandler}
        ></input>
        </Link>
      </form>
    </div>
  );
}

export default HelpTaskForm;