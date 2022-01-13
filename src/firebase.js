import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7hX0iZ5hNVOKwSmpDRLPGTIRAASENN38",
  authDomain: "insta-gallery-fcf52.firebaseapp.com",
  projectId: "insta-gallery-fcf52",
  storageBucket: "insta-gallery-fcf52.appspot.com",
  messagingSenderId: "353108525903",
  appId: "1:353108525903:web:896419a9532d1d69b5bb3a"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth= getAuth();
const db = getFirestore();
const storage = getStorage(firebaseApp);

export {firebaseApp, auth, db, storage};
