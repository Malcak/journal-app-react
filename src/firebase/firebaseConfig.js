import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyATrQFCWptgr8ritQPrRSm6VDbCZyzMw1I',
  authDomain: 'journal-app-malcak.firebaseapp.com',
  projectId: 'journal-app-malcak',
  storageBucket: 'journal-app-malcak.appspot.com',
  messagingSenderId: '1036039822015',
  appId: '1:1036039822015:web:4adc2b645f4746f76fc40a',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, db, googleAuthProvider };
