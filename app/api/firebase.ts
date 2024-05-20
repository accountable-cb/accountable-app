import { doc, getDoc, setDoc } from "firebase/firestore";
import { FoodLog } from "../types/definitions";
import { FIRESTORE_DB } from "../../FirebaseConfig";

export const createUserDoc = async (userId: string, email: string) => {
  await setDoc(doc(FIRESTORE_DB, "users", userId), {
    email: email,
    onboarded: false,
  });
};

export const completeOnboarding = async (userId: string) => {
  await setDoc(
    doc(FIRESTORE_DB, "users", userId),
    { onboarded: true },
    { merge: true }
  );
};

export const logFood = async (userId: string, log: FoodLog) => {
  await setDoc(
    doc(FIRESTORE_DB, "users", userId, "food_logs", log.id.toString()),
    log
  );
};
