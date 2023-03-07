// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCP_CfNhZxKpk-MW6QiBNJF61o0vB8nIy0",
  authDomain: "warfieldsandwyverns.firebaseapp.com",
  databaseURL: "https://warfieldsandwyverns-default-rtdb.firebaseio.com",
  projectId: "warfieldsandwyverns",
  storageBucket: "warfieldsandwyverns.appspot.com",
  messagingSenderId: "679003883365",
  appId: "1:679003883365:web:4f510e35f74e723e76038c",
  measurementId: "G-8JZ6R3BJS2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const reference = ref(db, 'users/raud');
set(reference, {username : 'raud', email : 'roaiodfin'});