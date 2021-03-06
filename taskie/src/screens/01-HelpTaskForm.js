import firebase from "firebase";
import css from "../css/taskform.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function HelpTaskForm (props) {
  
  const classes = useStyles();

  let { id } = useParams();
  const [task, setTask] = useState([]);
  let [notification, setNotification] = useState(false);

  useEffect(() => {
    const taskData = firebase
      .firestore()
      .collection("Task")
      .doc(id);
    taskData.get().then(function(doc) {
      setTask(doc.data());
    });
  }, []);

  const acceptHandler = event => {
    event.preventDefault();
    setNotification(true);
    firebase
      .firestore()
      .collection("Task")
      .doc(id)
      .update({
        taskStatus: "Accepted",
        acceptedBy: firebase.auth().currentUser.displayName,
        idAcceptedBy: firebase.auth().currentUser.uid
      });
    setTimeout(function() {
      props.history.push("/Home");
    }, 2000);
  };

  const rejectHandler = event => {
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
            <input disabled type="text" name="taskLink" value={task.taskLink} />
            <br></br>
          <p>
            Created by
            <br></br>
            {task.createdByName}
          </p>
          <Link to="/Home">
          <input
            name="accept"
            type="submit"
            value="Accept"
            onClick= {acceptHandler}
          ></input>
          </Link>
          <Link to="/Home">
          <input
            name="reject"
            type="submit"
            value="Reject"
            onClick= {rejectHandler}
          ></input>
          </Link>
        </form>
      </div>
      </div>
      </div>
      </div>
  );
}

export default HelpTaskForm;
