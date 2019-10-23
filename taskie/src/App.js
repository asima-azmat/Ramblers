import React, { Component } from "react";
import "./App.css";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

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
    signInFlow: "popup",
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
    callbacks: {
      signInSuccess: () => false
    }
  };

  componentWillUnmount = () => {
    console.log("unmounted");
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
      console.log("user", user);
    });

    let db = firebase.firestore();
    // Add a new document in collection "cities"

    db.collection("users")
      .add({
        first: "Ada",
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
        {this.state.isSignedIn ? (
          <span>
            <div>Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <h3>email: {firebase.auth().currentUser.email}</h3>
            <h4>id: : {firebase.auth().currentUser.uid}</h4>
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    );
  }
}

export default App;
