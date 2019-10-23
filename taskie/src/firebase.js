import firebase from 'Firebase'

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

  firebase.initializeApp(firebaseConfig);

  let db = firebase.firestore();
  // Add a new document in collection "cities"
  
  db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
});


  export default firebase;