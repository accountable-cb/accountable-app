import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import FoodCounter from "./FoodCounter";
import { doc, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { useAuth } from "../../AuthContext";
import { format } from "date-fns";

interface Log {
  id: number;
  beef: number;
  chicken: number;
  plant: number;
}
const Logger = ({ route, navigation }) => {
  const { log } = route.params;
  const { user } = useAuth();
  const [beef, setBeef] = useState(log.beef);
  const [chicken, setChicken] = useState(log.chicken);
  const [plant, setPlant] = useState(log.plant);

  const getFormattedDate = (date: Date) => {
    return format(date, "yyyy-MM-dd");
  };
  function getDateFromDayNumber(dayNum: number) {
    const millisecondsPerDay = 86400000; // 24 * 60 * 60 * 1000
    const epochTimeInMs = dayNum * millisecondsPerDay;
    return new Date(epochTimeInMs);
  }

  const decrement = (amount: number, setter: (newAmount: number) => void) => {
    return () => {
      if (amount > 0) {
        setter(amount - 1);
      }
    };
  };
  const increment = (amount: number, setter: (newAmount: number) => void) => {
    return () => {
      setter(amount + 1);
    };
  };

  const logFood = async () => {
    await setDoc(
      doc(FIRESTORE_DB, "users", user.uid, "food_logs", log.id.toString()),
      {
        beef,
        chicken,
        plant,
      }
    );
    navigation.goBack();
  };

  return (
    <View>
      <Text>{getFormattedDate(getDateFromDayNumber(log.id))}</Text>
      <FoodCounter
        name="Beef"
        count={beef}
        decrement={decrement(beef, setBeef)}
        increment={increment(beef, setBeef)}
      />
      <FoodCounter
        name="Chicken"
        count={chicken}
        decrement={decrement(chicken, setChicken)}
        increment={increment(chicken, setChicken)}
      />
      <FoodCounter
        name="Plant"
        count={plant}
        decrement={decrement(plant, setPlant)}
        increment={increment(plant, setPlant)}
      />
      <TouchableOpacity onPress={logFood}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Logger;

const styles = StyleSheet.create({});
