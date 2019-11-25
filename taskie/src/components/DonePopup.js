import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";

function DonePopup(props) {
  return (
    <Popup open modal closeOnDocumentClick>
      <div>
        <h1>
          Thank you John for solving Mary's task & enjoy your 15 minutes!{" "}
        </h1>
        <br></br>
        <Link to={`/Home`}>
          <button>SEE FREE TIME</button>
        </Link>
      </div>
    </Popup>
  );
}
export default DonePopup;
