import firebase from "firebase";
import css from "../css/taskform.css";
import React, {useState, useEffect} from "react";
import { Link, BrowserRouter, useParams } from "react-router-dom";

function HelpTaskForm () {
  let { slug } = useParams();
  console.log(slug);
  const [task,setTask] = useState([]);
   useEffect(() => {
    const taskData = firebase.firestore().collection('Task').doc('RlTLPL9ogFRS0pYeX8Li')
    taskData.get().then(function(doc) {
      setTask(doc.data());
    })
      console.log("this is task array:", taskData);
   }, []);

   return (
    <div className="task">
      <form>
        <h1>Task form!</h1>
        <label>Task title: </label>
        <br></br>
        <input disabled type="text" name="taskTitle" value = {task.taskTitle} />
        <br></br>
        <label>Task Description: </label>
        <br></br>
        <textarea disabled name="description" value = {task.description} />
        <br></br>
        <label>Related Role: </label>
        <br></br>
        <input disabled type="text" name="relatedRole" value = {task.relatedRole} />
        <br></br>
        <label>Deadline: </label>
        <br></br>
        <input disabled type="text" name="deadline" value = {task.deadline} />
        <br></br>
        <label>Estimated Time: </label>
        <br></br>
        <input
          disabled
          type="date"
          name="estimatedTime"
          value = {task.estimatedTime}
        />
        <br></br>
        <p>
          Assigned by:
          <br></br>
          {task.createdBy}
        </p>
        <Link to="/Home">
        <input
          name="accept"
          type="button"
          value="Accept"
          onClick= {firebase.firestore().collection('Task').doc('RlTLPL9ogFRS0pYeX8Li').update({taskStatus: "Accepted"})}
        ></input>
        </Link>
        {/* <Link to="/Home">
        <input
          name="reject"
          type="button"
          value="Reject"
        ></input>
        </Link> */}
      </form>
    </div>
  );
}
export default HelpTaskForm;
