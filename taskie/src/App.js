import React, { Component } from "react";
import "./App.css";
import "firebaseui/dist/firebaseui.css";
import Signup from "./screens/Signup.js";
import Dashboard from "./screens/Dashboard.js";
import TaskForm from "./screens/TaskForm.js";
import HelpTaskForm from "./screens/HelpTaskForm.js";
import { BrowserRouter as Switch, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import CreateUser from "./screens/CreateUser.js";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/HelpTaskForm" component={HelpTaskForm} />
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
