
//Firebase
var firebase = require('firebase');

//Firebase Configurations
const firebaseConfig = {
  apiKey: "AIzaSyBZxv3ohMkvQ4HxCzqfkhToT0Wf3OdJR2c",
  authDomain: "ramblers-253808.firebaseapp.com",
  databaseURL: "https://ramblers-253808.firebaseio.com",
  projectId: "ramblers-253808",
  storageBucket: "ramblers-253808.appspot.com",
  messagingSenderId: "751981469104",
  appId: "1:751981469104:web:b33d1c2a04b9920023ca75",
  measurementId: "G-DESLD4X1X5"
};


let data = {
  taskAssignedTo: 'asima.azmat@dpschool.io',
  taskAttachedFile: 'dummy.pdf',
  taskCreatedBy: 'asima.azmat@dpschool.io',
  taskDeadline: firebase.firestore.Timestamp.fromDate(new Date('November 10, 2019 11:00:00 AM')),
  taskDetails: 'details',
  taskStatus: 'Help Needed',
  taskTitle: 'Make Presentation'
};
////////////Adding data to DB/////////////
 async function addTask() {

//Data definition
  let data = {
   taskAssignedTo: 'asima.azmat@dpschool.io',
   taskAttachedFile: 'dummy.pdf',
   taskCreatedBy: 'asima.azmat@dpschool.io',
   taskDeadline: firebase.firestore.Timestamp.fromDate(new Date('November 10, 2019 11:00:00 AM')),
   taskDetails: 'details',
   taskStatus: 'Help Needed',
   taskTitle: 'Make Presentation'
 };

//Add defined data in collection "Task"
firebase.firestore().collection('Task').add({
  taskAssignedTo: data.taskAssignedTo,
  taskAttachedFile: data.taskAttachedFile,
  taskCreatedBy: data.taskCreatedBy,
  taskDeadline: data.taskDeadline,
  taskDetails: data.taskDetails,
  taskStatus: data.taskStatus,
  taskTitle: data.taskTitle
});

//return
return "Task data added succesfully.. :)";
 }

 //Task Added
 async function taskAdded() {
   try{
  let list = await addTask();
  console.log(list)
  console.log("Task data added succesfully.. :)")
   } catch(e) {
     console.log(e)
     console.log("error")
   }
  }

//Initialize database
firebase.initializeApp(firebaseConfig);

//Task Added
taskAdded();


////////////Adding data to DB/////////////
async function getTasks() {
    const Tasks = [];
  //read data from DB
     await firebase.firestore().collection('Task').get()
       .then(querySnapshot => {
         querySnapshot.docs.forEach(doc => {
         Tasks.push(doc.data());
         doc.data().taskAssignedTo = data.taskAssignedTo;
         doc.data().taskCreatedBy = data.taskCreatedBy;
         doc.data().taskAttachedFile = data.taskAttachedFile;
         doc.data().taskDeadline = data.taskDeadline;
         doc.data().taskDetails = data.taskDetails;
         doc.data().taskStatus = data.taskStatus;
         doc.data().taskTitle = data.taskTitle;
       });
     });
     return Tasks;
   }

async function listTasks() {
  let listOfTasks = await getTasks();
  console.log(JSON.stringify(listOfTasks))
  console.log(data.taskAssignedTo)
}
listTasks().then(()=>{console.log("All tasks are listed above.")});