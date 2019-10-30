import React, { Component } from "react";
import firebase, { db } from "firebase";
import { BrowserRouter as Redirect, Router, Route } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLastName: "",
      userId: "",
      userEmail: "",
      userFirstName: "",
      userTeam: "",
      userCompany: ""
    };
  }
  componentDidMount = () => {
    const user = db
      .collection("User")
      .doc(`${firebase.auth().currentUser.uid}`);

    user
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({ userEmail: doc.data().email });
          this.setState({ userFirstName: doc.data().firstName });
          this.setState({ userId: doc.data().id });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  };

  renderRedirect = () => {
    return <Redirect to="/NewUser" />;
  };

  render() {
    return (
      <div className="Home">
        <h1>hi! {`${this.state.userFirstName}`}</h1>
        <h1>{`${this.state.userEmail}`}</h1>
      </div>
    );
  }
}
export default Home;
