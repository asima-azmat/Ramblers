import React, { Component } from "react";
import firebase, { db } from "../firebase.js";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { Redirect } from "react-router-dom";
import "../css/signup.css";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Grid from "@material-ui/core/Grid";
// import CreateUser from "./CreateUser.js";
// import Dashboard from "./Dashboard.js";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import TaskForm from "./TaskForm.js";
// import welcomeImage from '../assets/welcome.png';

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
    } 
    else {
      return (
        <div className="some-page-wrapper">

          <div className="row"> 

            <div className="column">
              <div className="left-column">
                <div className="welcome-to">
                  Welcome To <br />
                  <div className="taskie-title">
                    <img src={require('../assets/Taskie.png')} alt="Welcome!"/>
                  </div>
                </div>
                <div className="welcome-image">
                  <img src={require('../assets/welcome.png')} alt="Welcome!"/>
                </div>        
              </div>
            </div>

            <div className="column">
              <div className="right-column">
                <div>
                  <h1>Discover Taskie</h1>
                  <h5 className="subtitle">
                    your new solution to get urgent or unexpected tasks done:<br />solved in time & within your team..<br /> Get help when you are needed. <br />
                    By just login with your company email
                  </h5>
                  <div id="firebaseui-auth-container"></div>
                </div> 
              </div>
            </div>

          </div>
                
        </div>
      );
    }
  }
}
export default Signup;

