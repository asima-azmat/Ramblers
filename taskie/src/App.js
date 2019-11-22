import React, { Component } from "react";
import "./App.css";
import "firebaseui/dist/firebaseui.css";
import Signup from "./screens/Signup.js";
import Dashboard from "./screens/Dashboard.js";
import TaskForm from "./screens/TaskForm.js";
import HelpTaskForm from "./screens/01-HelpTaskForm.js";
import AcceptTaskForm from "./screens/02-AcceptTaskForm.js";
import ReviewTaskForm from "./screens/03-ReviewTaskForm.js";
import DoneTaskForm from "./screens/04-DoneTaskForm.js";
import { BrowserRouter as BrowserRouter, Switch, Route, Link } from "react-router-dom";
import CreateUser from "./screens/CreateUser.js";
import Reward from "./screens/Reward.js";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/Reward" component={Reward} />
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
