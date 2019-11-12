import React, { Component } from "react";
import firebase, { db } from "../firebase.js";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import CreateUser from "./CreateUser.js";
import Dashboard from "./Dashboard.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import TaskForm from "./TaskForm.js";

class Signup extends Component {
  state = { isSignedIn: false };
  uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      {
        provider: "microsoft.com",
        providerName: "Microsoft",
        buttonColor: "#2F2F2F",
        iconUrl: "<icon-url-of-sign-in-button>",
        loginHintKey: "login_hint"
      }
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: "<your-tos-url>",
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
      window.location.assign("<your-privacy-policy-url>");
    }
  };

  componentDidMount = () => {
    // Initialize the FirebaseUI Widget using Firebase.
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", this.uiConfig);

    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    });
  };

  render() {
    if (this.state.isSignedIn) {
      return <Redirect to="/CreateUser" />;
    } else {
      return (
        <div className="App">
          <Grid container component="main" className="root">
            <CssBaseline />
            <Grid item m={12} sm={6}>
              <h1>Taskie</h1>
            </Grid>
            <Grid
              item
              m={20}
              sm={6}
              elevation={6}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <h5>
                It’s a platform for your team to create, assign, follow up
                tasks.
                <br /> Get help when you are needed.
                <br />
                By just login with your company email
              </h5>
              <div id="firebaseui-auth-container"></div>
            </Grid>
          </Grid>
        </div>
      );
    }
  }
}
export default Signup;
