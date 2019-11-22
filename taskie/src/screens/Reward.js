import firebase from "firebase";
import React, {useEffect} from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar";

function Reward() {

    var userAcceptedTasks = 0;
    console.log("on init:", userAcceptedTasks)
    useEffect(() => {
        firebase
        .firestore()
        .collection("Task")
        .where("idAcceptedBy", "==", firebase.auth().currentUser.uid)
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                userAcceptedTasks += 1
                console.log("in loop:", userAcceptedTasks); 
            })
        })
    }, []);

    var earnedMinutes = userAcceptedTasks * 15;
    console.log("eanred minutes:", earnedMinutes);
    

    return(
        <div className="app">
            <Navbar></Navbar>
            <div className="screen">
                <div className="bar">
                    <SideBar></SideBar>
                </div>
                <div className="rewardscreen">
                    <h6>
                        You have {earnedMinutes} minutes.
                    </h6>
                    
                </div>
            </div>
        </div>
    )
}

export default Reward;