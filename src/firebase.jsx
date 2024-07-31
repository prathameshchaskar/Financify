// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore,doc, setDoc } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjCViQ8iLTwIkomxPphYUZ-n1IRLXOLkU",
  authDomain: "financify-7e38b.firebaseapp.com",
  projectId: "financify-7e38b",
  storageBucket: "financify-7e38b.appspot.com",
  messagingSenderId: "709509332540",
  appId: "1:709509332540:web:817d4133b7c9d49b320d39",
  measurementId: "G-VWH1N24CNG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db, auth, provider, doc, setDoc};
