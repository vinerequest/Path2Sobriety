import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "your-api-key", // Replace with "AIzaSyBfL4_y2bba8Uoi6ZFG1Xz-49Po0pTE5Jk"
  authDomain: "path2sobriety.firebaseapp.com", // Your actual auth domain
  projectId: "path2sobriety", // Your actual project ID
  storageBucket: "path2sobriety.firebasestorage.app", // Your actual storage bucket
  messagingSenderId: "your-messaging-sender-id", // Replace with "30955616069"
  appId: "your-app-id" // Replace with "1:30955616069:web:f1323aa2bafeace326302c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);