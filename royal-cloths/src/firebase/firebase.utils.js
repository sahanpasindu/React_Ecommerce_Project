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

export const createUserProfileDocument = async (userAuth, additionalData) => {
   if (!userAuth) return;

   const userRef = firestore.doc(`users/${userAuth.uid}`);

   const snapShot = await userRef.get();

   if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createAt = new Date();

      try {
         await userRef.set({
            displayName, email, createAt, ...additionalData
         });
      } catch (error) {
         console.log('error creating user', error.message);
      }
   }
   return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
   const collectionRef = firestore.collection(collectionKey);
   // const collectionRef = firebase.firestore.collection(collectionKey)

   const batch = firestore.batch();
   objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
   });

   return await batch.commit()
};

export const convertCollectionsSnapshotToMap = (collection) => {
   const transformedCollection = collection.docs.map(doc => {
      const { title, items } = doc.data();
      return {
         routeName: encodeURI(title.toLowerCase()),
         id: doc.id,
         title,
         items
      };
   });

   console.log(transformedCollection);
};

export default firebase;