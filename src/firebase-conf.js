import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCk4EQ9o3cJz1IP6mM__yVuOUPDX0C3LUk",
  authDomain: "micorep1.firebaseapp.com",
  projectId: "micorep1",
  storageBucket: "micorep1.appspot.com",
  messagingSenderId: "283740629163",
  appId: "1:283740629163:web:dab0c592cc2076835fefee"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);