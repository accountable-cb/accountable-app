import {
  DocumentSnapshot,
  QuerySnapshot,
  collection,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { FoodLog, User } from "../types/definitions";
import { emptyFoodLog } from "../utils/definitions";

export const subscribeToFoodLogs = (
  userId: string,
  callback: (snapshot: FoodLog[]) => void
) => {
  const foodLogsRef = collection(FIRESTORE_DB, "users", userId, "food_logs");
  return onSnapshot(
    foodLogsRef,
    (snapshot: QuerySnapshot<FoodLog>) => {
      const logs = snapshot.docs.map((doc) => {
        // It's possible that a field was added to our food schema.
        // In that case it will show up as empty and look bad.
        // We can create an empty Food Log with all fields and merge it with the model from firebase.
        return { ...emptyFoodLog(), ...doc.data() } as FoodLog;
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
