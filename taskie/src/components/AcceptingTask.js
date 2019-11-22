import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";

function AcceptingTask(props) {
  return (
    <Popup open modal closeOnDocumentClick>
      <div>
        <h1> Thank you John for accepting Mary's task. </h1>
        <br></br>
        <Link to={`/Home`}>
          <button>Home</button>
        </Link>
      </div>
    </Popup>
  );
}
export default AcceptingTask;
