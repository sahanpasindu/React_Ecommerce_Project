import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
   apiKey: "AIzaSyAmrqQqiz9baxgrrBRd_6nOS6xZGpD8R_4",
   authDomain: "royal-db-ba89f.firebaseapp.com",
   databaseURL: "https://royal-db-ba89f.firebaseio.com",
   projectId: "royal-db-ba89f",
   storageBucket: "royal-db-ba89f.appspot.com",
   messagingSenderId: "240016140833",
   appId: "1:240016140833:web:d2a6fe604fc708f68dd160",
   measurementId: "G-KR764DPXRP"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;