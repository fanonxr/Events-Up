import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBZrAOfHlDfgaDJ-hHrmo95JGcbHri4vVA",
    authDomain: "eventsup-246101.firebaseapp.com",
    databaseURL: "https://eventsup-246101.firebaseio.com",
    projectId: "eventsup-246101",
    storageBucket: "eventsup-246101.appspot.com",
    messagingSenderId: "668433947081",
    appId: "1:668433947081:web:c224f4c4f6f94fa0"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore()

export default firebase;