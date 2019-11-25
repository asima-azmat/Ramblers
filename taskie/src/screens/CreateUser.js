import React, { Component, setState } from "react";
import firebase, { db } from "firebase";
import { withRouter } from "react-router-dom";
import "../css/createuser.css";

import { Redirect } from "react-router-dom";
import Dashboard from "./Dashboard.js";

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      userid: "",
      firstName: "",
      lastName: "",
      email: "",
      skills: [],
      team: "",
      company: ""
    };
  }
  componentDidMount() {
    let that = this;

    firebase.auth().onAuthStateChanged(function(currentUser) {
      that.setState({ userid: currentUser.uid, email: currentUser.email });

      var doc = firebase
        .firestore()
        .collection("User")
        .doc(currentUser.uid);

      doc
        .get()
        .then(doc => {
          if ((doc.data().firstName = !"")) {
            that.setState({
              user: true
            });
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    });
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
      .doc(this.state.userid);

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
          company: ""
        });
        this.props.history.push(`/Home`);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    return (
      <div className="page-wrapper">
        <div className="row">
          {/* <div id="login-box"> */}

          <div className="column">
            <div className="left-column">
              {/* <h1>Here goes the picture</h1> */}
              <div className="text-block">
                <h3>
                  Make time the real new value <br></br>for your team.
                </h3>
                <h5>
                  Every time you help your team mates on solving a task (each
                  less than 30 minutes of processing time) you will get 15
                  minutes of personal free time in return.
                </h5>{" "}
              </div>
            </div>
          </div>
          {/* {this.state.user ? ( */}
          <div className="column">
            {/* <div className="create-user"> */}
            <div className="right-column">
              <form onSubmit={this.submitHandler}>
                <h2>Complete Your Profile</h2>
                <label>FIRST NAME </label>
                <input
                  className="signup-input-text"
                  type="text"
                  name="firstName"
                  placeholder="Erika"
                  onChange={this.changeHandler}
                />
                <br />
                <label>LAST NAME</label>
                <input
                  className="signup-input-text"
                  type="text"
                  name="lastName"
                  placeholder="Mustermann"
                  onChange={this.changeHandler}
                />
                <br />
                <label>COMPANY</label>
                <input
                  className="signup-input-text"
                  type="text"
                  name="email"
                  placeholder="Digital Product School"
                  onChange={this.changeHandler}
                />
                <br />
                <label>YOUR ROLE</label>
                <input
                  className="signup-input-text"
                  type="text"
                  name="team"
                  placeholder="Software Engineer"
                  onChange={this.changeHandler}
                />
                <br />
                <label>YOUR TEAM</label>
                <input
                  className="signup-input-text"
                  type="text"
                  name="company"
                  placeholder="The Ramblers"
                  onChange={this.changeHandler}
                />
                <br />
                <ul className="row">
                  <li>
                    <input className="input-button input-submit-button" type="submit" value="SAVE"></input>
                  </li>
                  <li>
                    <input
                      className="input-button"
                      type="button"
                      value="CANCEL"
                      onClick={() => firebase.auth().signOut()}
                    ></input>
                  </li>
                </ul>
              </form>
            </div>
            {/* </div> */}
          </div>
          {/* ) : ( "hi" )}{" "} */}
        </div>
      </div>
    );
  }
}

export default CreateUser;
