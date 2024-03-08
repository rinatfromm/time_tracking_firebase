import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyCmLIu6EKCBmAoZaXcyityg6k5UuVPg_mo",
  authDomain: "time-tracker-eb460.firebaseapp.com",
  databaseURL: "https://time-tracker-eb460-default-rtdb.firebaseio.com",
  projectId: "time-tracker-eb460",
  storageBucket: "time-tracker-eb460.appspot.com",
  messagingSenderId: "153249795737",
  appId: "1:153249795737:web:ced77c126fb39d91af7208",
};

const app = initializeApp(firebaseConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export default db;
