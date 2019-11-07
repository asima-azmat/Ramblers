import React, { Component } from "react";
import "./App.css";
import "firebaseui/dist/firebaseui.css";
import Signup from "./screens/Signup.js";
import dashboard from "./screens/Dashboard.js";
import TaskForm from "./screens/TaskForm.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    // return <Signup />;
    return(<BrowserRouter>
   
    <Route path="/" exact component={Signup} />
    <Route path="/TaskForm"  component={TaskForm} />
  
  </BrowserRouter>);
  }
}

// ReactDOM.render((
//   <Router history = {browserHistory}>
//      <Route path = "/" component = {App}>
//         <IndexRoute component = {Signup} />
//         <Route path = "./TaskForm" component = {TaskForm} />
//      </Route>
//   </Router>
// ), document.getElementById('app'))

export default App;
