import React, { Component } from "react";
import firebase from "firebase";
import { withRouter } from "react-router-dom";

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      userid: firebase.auth().currentUser.uid,
      firstName: "",
      lastName: "",
      email: firebase.auth().currentUser.email,
      skills: [],
      team: "",
      company: ""
    };
  }
  componentDidMount = () => {
    var doc = firebase
      .firestore()
      .collection("User")
      .doc(this.state.userid);

    doc
      .get()
      .then(doc => {
        if ((doc.data().firstName = !"")) {
          console.log(doc.data());
          this.setState({
            user: true
          });
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
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
      <div className="user">
        {this.state.user ? (
          <div className="create-user">
            <form onSubmit={this.submitHandler}>
              <h1>Welcome!</h1>
              <label>First name: </label>
              <input
                type="text"
                name="firstName"
                onChange={this.changeHandler}
              />
              <br />
              <label>Last name: </label>
              <input
                type="text"
                name="lastName"
                onChange={this.changeHandler}
              />
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
        ) : (
          "hi"
        )}{" "}
      </div>
    );
  }
}
export default CreateUser;
