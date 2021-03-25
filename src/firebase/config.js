import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDY7GWzYap5Q0Zg5SJ3IAE4olSFG-QaF64",
    authDomain: "prodev-b2404.firebaseapp.com",
    projectId: "prodev-b2404",
    storageBucket: "prodev-b2404.appspot.com",
    messagingSenderId: "966561701312",
    appId: "1:966561701312:web:c39379990ed22a29d9bc25"
  };

// initialise firebase
firebase.initializeApp(firebaseConfig)


// initialise firebase services
const fStore = firebase.firestore()
const fAuth = firebase.auth()
const fStorage = firebase.storage()


// saving firebase timestamp method
const timestamp = firebase.firestore.FieldValue.serverTimestamp


export { timestamp, fStore, fAuth, fStorage }
