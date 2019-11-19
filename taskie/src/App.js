import React, { Component } from "react";
import "./App.css";
import "firebaseui/dist/firebaseui.css";
import Signup from "./screens/Signup.js";
import Dashboard from "./screens/Dashboard.js";
import TaskForm from "./screens/TaskForm.js";
import HelpTaskForm from "./screens/HelpTaskForm.js";
import AcceptTaskForm from "./screens/AcceptTaskForm.js";
import ReviewTaskForm from "./screens/ReviewTaskForm.js";
import DoneTaskForm from "./screens/DoneTaskForm.js";
import { BrowserRouter as BrowserRouter, Switch, Route, Link } from "react-router-dom";
import CreateUser from "./screens/CreateUser.js";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/DoneTaskForm/:id" component={DoneTaskForm} />
          <Route path="/ReviewTaskForm/:id" component={ReviewTaskForm} />
          <Route path="/AcceptTaskForm/:id" component={AcceptTaskForm} />
          <Route path="/HelpTaskForm/:id" component={HelpTaskForm} />
          <Route path="/TaskForm" component={TaskForm} />
          <Route path="/CreateUser" component={CreateUser} />
          <Route path="/Home" component={Dashboard} />
          <Route path="/" exact component={Signup} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
