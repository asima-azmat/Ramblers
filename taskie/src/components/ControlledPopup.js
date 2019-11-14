import React from "react";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";

class ControlledPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  render() {
    return (
      <Popup open modal closeOnDocumentClick>
        <div>
          <h1>
            {" "}
            Hey John - Mary needs your help! Get 15 minutes free-time by solving
            her task.{" "}
          </h1>
          <br></br>
          <Link to="/TaskForm">
            <button>Open new task</button>
          </Link>
        </div>
      </Popup>
    );
  }
}

export default ControlledPopup;
