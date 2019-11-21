import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";

function ControlledPopup(props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
  }, []);

  return (
    <Popup open modal closeOnDocumentClick>
      <div>
        <h1>
          {" "}
          Hey John! - Mary needs your help! Get 15 minutes free-time by solving
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
export default ControlledPopup;
