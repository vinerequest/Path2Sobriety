import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfL4_y2bba8Uoi6ZFG1Xz-49Po0pTE5Jk",
  authDomain: "path2sobriety.firebaseapp.com",
  projectId: "path2sobriety",
  storageBucket: "path2sobriety.firebasestorage.app",
  messagingSenderId: "30955616069",
  appId: "1:30955616069:web:f1323aa2bafeace326302c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);