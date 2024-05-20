import {
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
  collection,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";

export const subscribeToFoodLogs = (
  userId: string,
  callback: (snapshot: QuerySnapshot<DocumentData, DocumentData>) => void
) => {
  const foodLogsRef = collection(FIRESTORE_DB, "users", userId, "food_logs");
  return onSnapshot(
    foodLogsRef,
    (snapshot) => {
      callback(snapshot);
    },
    (error) => {
      console.error("Error fetching food logs:", error);
    }
  );
};

export const subscribeToUser = (
  userId: string,
  callback: (snapshot) => void
) => {
  const userDoc = doc(FIRESTORE_DB, "users", userId);
  return onSnapshot(
    userDoc,
    (snapshot) => {
      callback(snapshot);
    },
    (error) => {
      console.error("Error fetching food logs:", error);
    }
  );
};
