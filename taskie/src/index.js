import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Link, BrowserRouter, Switch as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Signup from "./screens/Signup.js";
import Home from "./screens/Home.js";
import NewUser from "./screens/CreateUser.js";

const routing = (
  <Router>
    <div>
      <Route path="./" component={App} />
      <Route path="./NewUser" component={NewUser} />
      <Route path="./home" component={Home} />
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
