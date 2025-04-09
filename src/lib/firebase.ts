// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9dzWad4nZlPoDawlertE_R2EKhxlmWv0",
  authDomain: "tech-connect-fb627.firebaseapp.com",
  projectId: "tech-connect-fb627",
  storageBucket: "tech-connect-fb627.firebasestorage.app",
  messagingSenderId: "190019840010",
  appId: "1:190019840010:web:c282b46bd8843a8d9b97f3",
  measurementId: "G-FJBSR6XEYS"
};

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics only on client side
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { auth, app, db, analytics };