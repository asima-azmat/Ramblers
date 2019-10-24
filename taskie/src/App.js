import React, { Component } from "react";
import "./App.css";
import "firebaseui/dist/firebaseui.css";
import Signup from "./screens/Signup.js";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return <Signup />;
  }
}

export default App;
