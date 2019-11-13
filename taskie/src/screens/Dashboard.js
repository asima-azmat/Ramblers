import React, { Component } from "react";
import firebase, { db } from "firebase";
import { BrowserRouter as Redirect, Router, Route } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import css from "../css/dashboard.css";
import { red } from "@material-ui/core/colors";
import Navbar from "../components/Navbar";
import TaskForm from "./TaskForm";
import CreateUser from "./CreateUser";
import addicon from "../assets/addicon.png";
import { Link, BrowserRouter } from "react-router-dom";
import Task from "../components/Task";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {};

  // redirect() {
  //   return <CreateUser />;
  // }
  render() {
    return (
      <div className="app">
        <Navbar></Navbar>
        <div className="screen">
          <div className="dashboard">
            <div className="column">
              <div className="help-title">
                <Typography component="h1" variant="h6" color="inherit" noWrap>
                  Help needed
                </Typography>
              </div>
              <div>
                <br></br>
                <Link to="/TaskForm">
                  <button>
                    <img src={addicon} style={{ width: 20, height: 20 }}></img>{" "}
                    Create a new task
                  </button>
                </Link>
              </div>
              <Task taskStatus="Help"></Task>
            </div>
            <div className="column">
              <div className="accepted-title">
                <Typography component="h1" variant="h6" color="inherit" noWrap>
                  Accepted
                </Typography>
              </div>
              <Task taskStatus="Accepted"></Task>
            </div>
            <div className="column">
              <div className="review-title">
                <Typography component="h1" variant="h6" color="inherit" noWrap>
                  To be reviewed
                </Typography>
              </div>
              <Task taskStatus="Review"></Task>
            </div>
            <div className="column">
              <div className="done-title">
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  style={{ backgroundColor: red }}
                >
                  Done
                </Typography>
              </div>
              <Task taskStatus="Done"></Task>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
