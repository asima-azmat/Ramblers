import React, { Component } from "react";
import firebase, { db } from "firebase";
import { BrowserRouter as Redirect, Router, Route } from "react-router-dom";

class TaskView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskID: "",
            taskCreatedBy: "",
            taskTitle: "",
            taskDetails: "",
            taskDeadline: "",
            taskAttachedFile: "",
            taskAssignedTo: ""
        };
    }

render() {
    return(
        <div className="taskView">
            <form>
                <h1>
                    
                </h1>
            </form>
        </div>
    )
};

}

export default TaskView;