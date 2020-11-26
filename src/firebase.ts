import firebase from 'firebase/app'
import "firebase/storage"
import "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyDzqmMA8zb3mDgpq8LVW_7i3Rsrm1ttWrk",
    authDomain: "dot-nanja.firebaseapp.com",
    databaseURL: "https://dot-nanja.firebaseio.com",
    projectId: "dot-nanja",
    storageBucket: "dot-nanja.appspot.com",
    messagingSenderId: "710496275894",
    appId: "1:710496275894:web:22b6b3ca158fbdea72c517",
    measurementId: "G-FQZRMDVNPG"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

export const fireStore = firebase.firestore()
export const storage = firebase.storage()