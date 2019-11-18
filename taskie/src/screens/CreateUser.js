import React, { Component } from "react";
import firebase, { db } from "firebase";
import { withRouter } from "react-router-dom";
import "../css/createuser.css";

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      userid: "",
      // userid: firebase.auth().currentUser.uid,
      firstName: "",
      lastName: "",
      email: "",
      // email: firebase.auth().currentUser.email,
      skills: [],
      team: "",
      company: ""
    };
  }
  componentDidMount() {
    let that = this;

    firebase.auth().onAuthStateChanged(function(currentUser){
      that.setState({ userid: currentUser.uid, email: currentUser.email });
      

    var doc = firebase
      .firestore()
      .collection("User")
      .doc(currentUser.uid);

    doc
      .get()
      .then(doc => {
        if ((doc.data().firstName = !"")) {
          console.log(doc.data());
          that.setState({
            user: true
          });
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
    });
  };

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

    console.log(this.props);

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
        console.log("added");
        this.props.history.push(`/Home`);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };
  render() {
    return (
      <div id="login-box">
      <div className="left-box">
          {/* <p>Here goes the picture</p>         */}
        </div>

      <div className="right-box">
        {this.state.user ? (
          <div className="create-user">
            <form onSubmit={this.submitHandler}>
              <h1>Complete Your Profile</h1>
              <label>First name: </label>
              <input
                type="text"
                name="firstName"
                placeholder="Erika"
                onChange={this.changeHandler}
              />
              <br />
              <label>Last name: </label>
              <input
                type="text"
                name="lastName"
                placeholder="Mustermann"
                onChange={this.changeHandler}
              />
              <br />
              <label>email:</label>
              <input
                type="text"
                name="email"
                placeholder="e.mustermann@gmail.com"
                onChange={this.changeHandler}
                disabled
              />
              <br />
              <label>Team:</label>
              <input type="text" name="team" placeholder="Ramblers" onChange={this.changeHandler} />
              <br />
              <label>company:</label>
              <input type="text" name="company" placeholder="DPS" onChange={this.changeHandler} />
              <br />
              <input type="submit"></input>
              <input type="button" value="Cancel"></input>

              <button className="clickable" onClick={() => firebase.auth().signOut()}>Cancel</button>
            </form>

            
          </div>
        ) : (
          "hi"
        )}{" "}
      </div>
      </div>

    );
  }
}
export default CreateUser;
