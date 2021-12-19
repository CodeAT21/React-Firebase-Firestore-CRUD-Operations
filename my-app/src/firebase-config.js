import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA9KbtwienZo4Mw2bBgK0NOJgylyHcUqvw",
  authDomain: "react-test-a85c3.firebaseapp.com",
  projectId: "react-test-a85c3",
  storageBucket: "react-test-a85c3.appspot.com",
  messagingSenderId: "569657970297",
  appId: "1:569657970297:web:3b589cf13de06aeedc0ea8"
});

const db = firebaseApp.firestore();
export default db;