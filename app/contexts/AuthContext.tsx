import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { User } from "../types/definitions";
import { doc, onSnapshot } from "firebase/firestore";
import { createUserDoc } from "../api/firebase";
import { subscribeToUser } from "../api/subscriptions";

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let userDocUnsubscribe = null;

    const subscriber = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);

      // Ensure any existing user document subscription is cancelled
      if (userDocUnsubscribe) {
        userDocUnsubscribe();
      }

      if (user) {
        userDocUnsubscribe = subscribeToUser(user.uid, (snapshot) => {
          const userObject = {
            id: snapshot.id,
            name: snapshot.data()?.name,
            email: snapshot.data().email,
            onboarded: snapshot.data().onboarded,
          };
          setUser(userObject);
        });
      } else {
        setUser(null);
      }
    });
    return subscriber;
  }, []);

  // Sign in method
  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
  };

  const signUp = async (email: string, password: string) => {
    const userCredentials = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );

    createUserDoc(userCredentials.user.uid, userCredentials.user.email);
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
