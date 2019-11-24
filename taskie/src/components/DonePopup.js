import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";

function DonePopup(props) {
  return (
    <Popup open modal closeOnDocumentClick>
      <div>
        <h1>Congratulations Mary </h1>
        <br></br>
        <Link to={`/HelpTaskForm/${props.taskId}`}>
          <button>Open new task</button>
        </Link>
      </div>
    </Popup>
  );
}
export default DonePopup;
