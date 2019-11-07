import React, { Component } from "react";
import firebase, { db } from "firebase";
import { BrowserRouter as Redirect, Router, Route } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import css from "../css/dashboard.css";
import { red } from "@material-ui/core/colors";
import Navbar from "../components/Navbar";
import TaskForm from "./TaskForm";
import {Link, BrowserRouter } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {};

  redirect(){
    return <TaskForm />
  }
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
                <button> Create a new task</button>
                {/* <Link>Create a new task</Link> */}
                </Link>
             
              </div>

            </div>
            <div className="column">
              <div className="accepted-title">
                <Typography component="h1" variant="h6" color="inherit" noWrap>
                  Accepted
                </Typography>
              </div>
            </div>
            <div className="column">
              <div className="review-title">
                <Typography component="h1" variant="h6" color="inherit" noWrap>
                  To be reviewed
                </Typography>
              </div>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
