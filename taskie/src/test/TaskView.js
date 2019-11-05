var firebase = require('firebase');
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
 function add_to_table(name) {
   firebase.firestore().collection('users').add({
     name: name
   });
 }
 // firebase.initializeApp(firebaseConfig);
 // try{
 //   add_to_table("AsimaAzmat")
 // console.log("success")
 // } catch(err) {
 //     console.log("failed")
 //     console.log(err)
 async function getMarkers() {
   const markers = [];
   await firebase.firestore().collection('Task').get()
     .then(querySnapshot => {
       querySnapshot.docs.forEach(doc => {
       markers.push(doc.data());
     });
   });
   return markers;
 }
firebase.initializeApp(firebaseConfig);
async function hello() {
let list = await getMarkers();
console.log(JSON.stringify(list))
}
hello();
// var requestbody = {
//     "timeMin": datetime,
//     "timeMax": datetime,
//     "timeZone": string,
//     "groupExpansionMax": integer,
//     "calendarExpansionMax": integer,
//     "items": [
//       {
//         "id": string
//       }
//     ]
//   }
// var request = require('request');
// request.post({
//   headers: {'content-type' : 'application/x-www-form-urlencoded'},
//   url:     'https://www.googleapis.com/calendar/v3/freeBusy',
//   json: true,
//   body: requestbody,
// }, function(error, response, body){
//   console.log(body);
// });