// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6RcJfXFUQA2t8z5pcU65WUI2PE2eB3mM",
  authDomain: "accountable-dee98.firebaseapp.com",
  projectId: "accountable-dee98",
  storageBucket: "accountable-dee98.appspot.com",
  messagingSenderId: "55171556370",
  appId: "1:55171556370:web:1529614a2e45e4db9fe4cb",
  measurementId: "G-783GVQW03S",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
