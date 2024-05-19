import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "./FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setUser(user);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  // Sign in method
  const signIn = async (email, password) => {
    return await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
  };

  const signUp = async (email, password) => {
    const userCredentials = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );

    setDoc(doc(FIRESTORE_DB, "users", userCredentials.user.uid), {
      email: userCredentials.user.email,
      onboarded: false,
    });
  };

  // Sign out method
  const signOut = async () => {
    try {
      await FIREBASE_AUTH.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
