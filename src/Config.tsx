// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1ftGgyk3HoOm9izkKYvkZ5IWp0wpaCyM",
  authDomain: "antrian-qms-ts.firebaseapp.com",
  projectId: "antrian-qms-ts",
  storageBucket: "antrian-qms-ts.appspot.com",
  messagingSenderId: "1014669274543",
  appId: "1:1014669274543:web:86c5c9b6ec490bc520135a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db