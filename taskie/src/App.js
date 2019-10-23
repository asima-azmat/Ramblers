import React, { Component } from "react";
import "./App.css";
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

firebase.initializeApp({
  apiKey: "AIzaSyBZxv3ohMkvQ4HxCzqfkhToT0Wf3OdJR2c",
  authDomain: "ramblers-253808.firebaseapp.com",
  databaseURL: "https://ramblers-253808.firebaseio.com",
  projectId: "ramblers-253808",
  storageBucket: "ramblers-253808.appspot.com",
  messagingSenderId: "751981469104",
  appId: "1:751981469104:web:b33d1c2a04b9920023ca75",
  measurementId: "G-DESLD4X1X5"
});

class App extends Component {
  state = { isSignedIn: false };
  uiConfig = {
    signInSuccessUrl: "<url-to-redirect-to-on-success>",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
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

  componentWillUnmount = () => {
    console.log("unmounted");
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

    let db = firebase.firestore();
    // Add a new document in collection "cities"

    db.collection("users")
      .add({
        first: "FFMM",
        last: "Lovelace",
        born: 1815
      })
      .then(res => console.log("Stored"))
      .catch(err => console.log(err, "err"));

    db.collection("users")
      .get()
      .then(querySnapshot => {
        console.log("snapshot");
        querySnapshot.forEach(doc => {
          console.log(`${doc.id} => ${doc.data()}`);
        });
      })
      .catch(() => console.log("err"));
  };

  render() {
    return (
      <div className="App">
        <div id="firebaseui-auth-container"></div>
        {this.state.isSignedIn ? (
          <span>
            <div>Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <h3>email: {firebase.auth().currentUser.email}</h3>
            <h4>id: : {firebase.auth().currentUser.uid}</h4>
          </span>
        ) : null}
      </div>
    );
  }
}

export default App;
