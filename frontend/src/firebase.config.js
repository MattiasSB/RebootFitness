
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBTS6bDyGDz4MoeXUDUiF-VDURGLBjNWEM",

  authDomain: "reboot-fitness-db8a4.firebaseapp.com",

  projectId: "reboot-fitness-db8a4",

  storageBucket: "reboot-fitness-db8a4.appspot.com",

  messagingSenderId: "1068298833323",

  appId: "1:1068298833323:web:d1911d1b1379f5f076d6ee",

  databaseURL: "https://reboot-fitness-db8a4-default-rtdb.firebaseio.com"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore()
export const database = getDatabase(app);