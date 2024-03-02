// import firebase from 'firebase';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARWTSRJcGjD5pWr2Lj3VRXsPNkt-2vJ9o",
  authDomain: "telegram-clone-b1b8d.firebaseapp.com",
  projectId: "telegram-clone-b1b8d",
  storageBucket: "telegram-clone-b1b8d.appspot.com",
  messagingSenderId: "608733346469",
  appId: "1:608733346469:web:48dd7d5900a07389bbab4c",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
