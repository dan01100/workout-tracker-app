// import firebase from "firebase";
// import "firebase/firestore";
// import "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyBmIR1mfpN5bYByCbX0F2LhT4oN54WhKJ4",
//   authDomain: "workout-app-f0578.firebaseapp.com",
//   projectId: "workout-app-f0578",
//   storageBucket: "workout-app-f0578.appspot.com",
//   messagingSenderId: "1026001169656",
//   appId: "1:1026001169656:web:45e0e958b5801378999f0d"
// };

// let firebaseApp;

// if (firebase.apps.length === 0) {
//   firebaseApp = firebase.initializeApp(firebaseConfig);
// } else {
//   firebaseApp = firebase.app();
// }

// const db = firebaseApp.firestore();
// const auth = firebase.auth();

// export { db, auth };


import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBmIR1mfpN5bYByCbX0F2LhT4oN54WhKJ4",
  authDomain: "workout-app-f0578.firebaseapp.com",
  projectId: "workout-app-f0578",
  storageBucket: "workout-app-f0578.appspot.com",
  messagingSenderId: "1026001169656",
  appId: "1:1026001169656:web:45e0e958b5801378999f0d"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
