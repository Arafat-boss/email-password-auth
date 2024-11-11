// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl_DZZUm62NJ5oH24a1vZUPCO7Fsoeyhk",
  authDomain: "email-password-auth-d9163.firebaseapp.com",
  projectId: "email-password-auth-d9163",
  storageBucket: "email-password-auth-d9163.firebasestorage.app",
  messagingSenderId: "783121252467",
  appId: "1:783121252467:web:149338928e106ec2b06a06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;