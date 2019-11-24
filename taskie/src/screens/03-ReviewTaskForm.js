import firebase from "firebase";
import css from "../css/taskform.css";
import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar";

function ReviewTaskForm (props) {
  
  let { id } = useParams();

  const [task,setTask] = useState([]);
   useEffect(() => {
    const taskData = firebase.firestore().collection('Task').doc(id)
    taskData.get().then(function(doc) {
      setTask(doc.data());
    })
   }, []);
   
  // const usertoReward = task.idAcceptedBy;

  //  console.log("ID of User to Reward:", usertoReward);

  // const [rewardUser,setRewardUser] = useState([]);
  //   useEffect(() => {
  //   const rewardUserData = firebase.firestore().collection('User').doc(usertoReward)
  //   rewardUserData.get().then(function(doc) {
  //   setRewardUser(doc.data());
  //   })
  //   }, []);
  //   console.log("wtf", rewardUser.email);

   const doneHandler = event => {
    event.preventDefault();
    firebase
    .firestore()
    .collection('Task')
    .doc(id)
    .update({taskStatus: "Done", taskResolvedBy: task.idAcceptedBy});
    props.history.push("/Home");
   };

   const cancelHandler = event => {
    event.preventDefault();
    props.history.push("/Home");
   };

   return (
    <div className="app">
    <Navbar></Navbar>
    <div className="screen">
      <div className="bar">
        <SideBar></SideBar>
      </div>
      <div className="dashboard">
      <div className="task">
      <form onSubmit= {doneHandler}>
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
          {task.createdByName}
        </p>
        <br></br>
        <p>
          Solved by
          <br></br>
          {task.acceptedBy}
        </p>
        <label>Solution</label>
        <br></br>
        <textarea 
        name="solution" 
        value={task.taskSolution}
        disabled/>
        <br></br>
        <label>Solution Link</label>
          <br></br>
          <input
          type="text"
          name="solutionLink"
          value={task.solutionLink}
          disabled/>
          <br></br>
        <Link to="/Home">
        <input
          name="done"
          type="submit"
          value="Done"
          onClick= {doneHandler}
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
    </div>
    </div>
    </div>
  );
}

export default ReviewTaskForm;