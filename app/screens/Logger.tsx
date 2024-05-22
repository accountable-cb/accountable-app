import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { FoodCounter } from "../components/FoodCounter";
import { useAuth } from "../contexts/AuthContext";
import { FoodLog } from "../types/definitions";
import { logFood } from "../api/firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { emptyFoodLog } from "../utils/definitions";
import { food } from "../data/food";

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

  const clearAll = () => {
    setWorkingLog({
      ...emptyFoodLog(),
      id: workingLog.id,
    });
  };

  const logFoodLog = async () => {
    logFood(user.id, workingLog);
    navigation.goBack();
  };

  const capitalizeFirstLetter = (input: string): string => {
    if (!input) return input; // return the original string if it's empty
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Which food did you eat?</Text>
        <TouchableOpacity onPress={clearAll}>
          <Text style={styles.clearAllText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {Object.keys(food).map((foodName) => {
          return (
            <FoodCounter
              key={foodName}
              name={capitalizeFirstLetter(foodName)}
              count={workingLog[foodName]}
              increment={increment(foodName)}
            />
          );
        })}
      </ScrollView>
      <TouchableOpacity style={styles.bottomButton} onPress={logFoodLog}>
        <Text style={styles.bottomButtonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Logger;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  clearAllText: {
    fontSize: 16,
    color: "green",
  },
  scrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  bottomButton: {
    backgroundColor: "#4CAF50", // Green background
    padding: 20,
    borderRadius: 30,
    marginHorizontal: 24,
    alignItems: "center",
  },
  bottomButtonText: {
    fontSize: 18,
    color: "white",
  },
});
