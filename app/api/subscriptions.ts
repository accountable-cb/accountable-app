import {
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
  collection,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { FoodLog, User } from "../types/definitions";

export const subscribeToFoodLogs = (
  userId: string,
  callback: (snapshot: FoodLog[]) => void
) => {
  const foodLogsRef = collection(FIRESTORE_DB, "users", userId, "food_logs");
  return onSnapshot(
    foodLogsRef,
    (snapshot: QuerySnapshot<FoodLog>) => {
      const logs = snapshot.docs.map((doc) => {
        return doc.data() as FoodLog;
      });
      callback(logs);
    },
    (error) => {
      console.error("Error fetching food logs:", error);
    }
  );
};

export const subscribeToUser = (
  userId: string,
  callback: (doc: User) => void
) => {
  const userDoc = doc(FIRESTORE_DB, "users", userId);
  return onSnapshot(
    userDoc,
    (doc: DocumentSnapshot<User>) => {
      callback(doc.data() as User);
    },
    (error) => {
      console.error("Error fetching user:", error);
    }
  );
};
