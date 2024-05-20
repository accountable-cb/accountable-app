import { createContext, useContext, useEffect, useState } from "react";
import { FoodLog } from "../types/definitions";
import { useAuth } from "./AuthContext";
import { subscribeToFoodLogs } from "../api/subscriptions";

interface UserDataContextType {
  data: { [id: string]: FoodLog };
}

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

export const useData = () => useContext(UserDataContext);

export const UserDataProvider = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const [data, setData] = useState<{ [id: string]: FoodLog } | undefined>(
    undefined
  );

  useEffect(() => {
    const subscription = subscribeToFoodLogs(user.id, (foodLogs) => {
      const result = {};
      foodLogs.forEach((doc) => {
        result[doc.id] = doc;
      });
      setData(result);
    });

    return subscription;
  }, []);

  return (
    <UserDataContext.Provider value={{ data }}>
      {children}
    </UserDataContext.Provider>
  );
};
