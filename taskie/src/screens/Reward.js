import firebase from "firebase";
import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import Typography from "@material-ui/core/Typography";
import css from "../css/dashboard.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 500,
      
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }));

function Reward() {

    const [solved, setSolved] = useState([]);

    const solvedTasksArray = [];
    
    useEffect(() => {
        firebase
        .firestore()
        .collection("Task")
        .where("idAcceptedBy", "==", firebase.auth().currentUser.uid)
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                solvedTasksArray.push(doc.data());
            });
            setSolved(solvedTasksArray);
        });
    }, []);   

    const classes = useStyles();
    const [redeem, setRedeem] = React.useState("");

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleChange = event => {
        setRedeem(event.target.value);
    };

    return(
        <div className="app">
            <Navbar></Navbar>
            <div className="screen">
                <div className="bar">
                    <SideBar></SideBar>
                </div>
                <div className="dashboard">
                    <Typography component="h1" variant="h5" color="#000000" textAlign="left">
                    Congratulations!<br/>
                    You have earned {(solved.length) * 15 } minutes so far.<br/>
                    Every time you help your team you can collect 15 minutes<br/>
                    for your free hour or for your next day off.<bt/>
                    How much time would you like to spend?
                    </Typography>
                    {/* {{if ((solved.length) * 15 )}} */}
                    <div className="form">
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel} id="input">
                        Redeem your time
                        </InputLabel>
                        <Select
                        labelId="input"
                        id="select"
                        value={redeem}
                        color = "#000000"
                        onChange={handleChange}
                        labelWidth={labelWidth}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={120}>2 Hours</MenuItem>
                        <MenuItem value={240}>4 Hours</MenuItem>
                        <MenuItem value={480}>1 Day</MenuItem>
                        </Select>
                    </FormControl>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reward;