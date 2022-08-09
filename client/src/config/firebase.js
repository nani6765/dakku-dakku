import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPucGiQt-ntOsCWmGtDWFblohUzN3eJwo",
  authDomain: "dakkudakku-b0e52.firebaseapp.com",
  databaseURL:
    "https://dakkudakku-b0e52-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dakkudakku-b0e52",
  storageBucket: "dakkudakku-b0e52.appspot.com",
  messagingSenderId: "34663571989",
  appId: "1:34663571989:web:9cac396057e5c4f462a41c",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth();
export { firebaseApp, firebaseAuth };
