import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { FoodCounter } from "../components/FoodCounter";
import { useAuth } from "../contexts/AuthContext";
import { getDateFromDayNumber, getFormattedDate } from "../utils/date";
import { FoodLog } from "../types/definitions";
import { logFood } from "../api/firebase";

const Logger = ({ route, navigation }) => {
  const { log } = route.params;
  const { user } = useAuth();
  const [workingLog, setWorkingLog] = useState<FoodLog>(log);

  const increment = (attr: string) => {
    return () => {
      setWorkingLog((prevLog) => {
        const newLog = {
          ...prevLog,
          [attr]: (prevLog[attr] || 0) + 1,
        };
        return newLog;
      });
    };
  };

  const decrement = (attr: string) => {
    return () => {
      setWorkingLog((prevLog) => {
        const newLog = {
          ...prevLog,
          [attr]: Math.max((prevLog[attr] || 0) - 1, 0),
        };
        return newLog;
      });
    };
  };

  const logFoodLog = async () => {
    logFood(user.id, workingLog);
    navigation.goBack();
  };

  return (
    <View>
      <Text>{getFormattedDate(getDateFromDayNumber(log.id))}</Text>
      <FoodCounter
        name="Beef"
        count={workingLog.beef}
        decrement={decrement("beef")}
        increment={increment("beef")}
      />
      <FoodCounter
        name="Chicken"
        count={workingLog.chicken}
        decrement={decrement("chicken")}
        increment={increment("chicken")}
      />
      <FoodCounter
        name="Plant"
        count={workingLog.plant}
        decrement={decrement("plant")}
        increment={increment("plant")}
      />
      <TouchableOpacity onPress={logFoodLog}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Logger;

const styles = StyleSheet.create({});
