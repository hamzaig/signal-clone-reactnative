import firebase from 'firebase/app'

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/firestore";
//import "firebase/database";
//import "firebase/functions";
//import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDjSBiR4EebhnpJAaOmG0zHmC6bmkS_Z6U",
    authDomain: "mysignal-c71b9.firebaseapp.com",
    projectId: "mysignal-c71b9",
    storageBucket: "mysignal-c71b9.appspot.com",
    messagingSenderId: "427634415440",
    appId: "1:427634415440:web:a1734eebb6f1812dc6be55"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };

