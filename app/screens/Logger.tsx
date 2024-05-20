import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { FoodCounter } from "../components/FoodCounter";
import { useAuth } from "../contexts/AuthContext";
import { getDateFromDayNumber, getFormattedDate } from "../utils/date";
import { FoodLog } from "../types/definitions";
import { logFood } from "../api/firebase";
import { SafeAreaView } from "react-native-safe-area-context";

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
      id: workingLog.id,
      beef: 0,
      chicken: 0,
      plant: 0,
    });
  };

  const logFoodLog = async () => {
    logFood(user.id, workingLog);
    navigation.goBack();
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
        <FoodCounter
          name="Beef"
          count={workingLog.beef}
          increment={increment("beef")}
        />
        <FoodCounter
          name="Chicken"
          count={workingLog.chicken}
          increment={increment("chicken")}
        />
        <FoodCounter
          name="Plant"
          count={workingLog.plant}
          increment={increment("plant")}
        />
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
