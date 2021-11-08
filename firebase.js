import firebase from 'firebase/app';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACgTr0FkfJ3h-sF2vyw-icsj_TCAiJuN0",
  authDomain: "codeninjas-1add4.firebaseapp.com",
  projectId: "codeninjas-1add4",
  storageBucket: "codeninjas-1add4.appspot.com",
  messagingSenderId: "561331504462",
  appId: "1:561331504462:web:8034c246347f8084aeca1f",
  measurementId: "G-ZCK2RRKP9V",
  databaseURL:"https://codeninjas-1add4-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;