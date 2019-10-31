import React, { Component } from "react";
import firebase, { db } from "firebase";
import { BrowserRouter as Redirect, Router, Route } from "react-router-dom";

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      skills: [],
      team: ""
    };
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submitHandler = event => {
    event.preventDefault();
    const { email, lastName, firstName, team, company } = this.state;

    const updateRef = firebase
      .firestore()
      .collection("User")
      .doc(`${firebase.auth().currentUser.uid}`);
    updateRef
      .set({
        lastName,
        email,
        firstName,
        team,
        company
      })
      .then(docRef => {
        this.setState({
          lastName: "",
          email: "",
          firstName: "",
          team: "",
          company: "",
          notFirst: true
        });
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };
  render() {
    return (
      <div className="user">
        <div className="create-user">
          <form onSubmit={this.submitHandler}>
            <h1>Welcome!</h1>
            <label>First name: </label>
            <input type="text" name="firstName" onChange={this.changeHandler} />
            <br />
            <label>Last name: </label>
            <input type="text" name="lastName" onChange={this.changeHandler} />
            <br />
            <label>email:</label>
            <input
              type="text"
              name="email"
              onChange={this.changeHandler}
              disabled
            />
            <br />
            <label>Team:</label>
            <input type="text" name="team" onChange={this.changeHandler} />
            <br />
            <label>company:</label>
            <input type="text" name="company" onChange={this.changeHandler} />
            <br />
            <input type="submit"></input>
          </form>
          <button onClick={() => firebase.auth().signOut()}>Cancel</button>
        </div>
      </div>
    );
  }
}
export default CreateUser;
