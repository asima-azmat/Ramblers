import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";

function AcceptedTaskPopup(props) {
  return (
    <Popup open modal closeOnDocumentClick>
      <div>
        <h1> Hey Mary! Help in sight - John accepted your task. </h1>
        <br></br>
        <Link to={`/Home`}>
          <button>Home</button>
        </Link>
      </div>
    </Popup>
  );
}
export default AcceptedTaskPopup;
