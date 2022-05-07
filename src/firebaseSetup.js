import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyBQ0yQV8QXUFrg-nwhOowWfb2POwNS9dZg",
    authDomain: "discussion-board-2d151.firebaseapp.com",
    projectId: "discussion-board-2d151",
    storageBucket: "discussion-board-2d151.appspot.com",
    messagingSenderId: "122381346506",
    appId: "1:122381346506:web:a4bea317b1748e81f23633",
    measurementId: "G-RKZHL24R8Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);

export const setDocument = async (documentReference, content) => 
await setDoc(documentReference, content);