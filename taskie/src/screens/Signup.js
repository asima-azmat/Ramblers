import React, { Component } from "react";
import firebase, { db } from "../firebase.js";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
//import firebase from "../Firebase.js";

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
      console.log("user", user);
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <div>Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <h3>email: {firebase.auth().currentUser.email}</h3>
            <h4>id: : {firebase.auth().currentUser.uid}</h4>
          </span>
        ) : (
          <div id="firebaseui-auth-container"></div>
        )}
      </div>
    );
  }
}
export default Signup;
