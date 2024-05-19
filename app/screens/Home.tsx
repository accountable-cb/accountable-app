import { Text, Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { useAuth } from "../../AuthContext";
import { format } from "date-fns";
import { collection, onSnapshot } from "firebase/firestore";
import CalendarStrip from "react-native-calendar-strip";
import { SafeAreaView } from "react-native-safe-area-context";
import { setLogLevel } from "firebase/app";

const Home = ({ navigation }) => {
  const { user } = useAuth();
  const [foodLogs, setFoodLogs] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const getCurrentFormattedDate = (date: Date) => {
    return format(date, "yyyy-MM-dd");
  };
  const getDaysSinceEpoch = (date: Date) => {
    const timestamp = date.getTime(); // Get the timestamp in milliseconds
    const millisecondsPerDay = 1000 * 60 * 60 * 24; // Number of milliseconds in a day
    return Math.floor(timestamp / millisecondsPerDay); // Convert to days and remove fractional days
  };
  function getDateFromDayNumber(dayNum: number) {
    const millisecondsPerDay = 86400000; // 24 * 60 * 60 * 1000
    const epochTimeInMs = dayNum * millisecondsPerDay;
    return new Date(epochTimeInMs);
  }

  useEffect(() => {
    const foodLogsRef = collection(
      FIRESTORE_DB,
      "users",
      user.uid,
      "food_logs"
    );

    const unsubscribe = onSnapshot(
      foodLogsRef,
      (snapshot) => {
        const result = {};
        snapshot.docs.forEach((doc) => {
          const numId = Number(doc.id);
          result[numId] = { id: numId, ...doc.data() };
        });
        setFoodLogs(result);
        setLoading(false);
      },
      (error) => {
        // Handle any errors
        console.error("Error fetching food logs:", error);
      }
    );

    return unsubscribe; // Return the unsubscribe function to call when you want to stop listening
  }, []);

  const onDateSelected = (date) => {
    setSelectedDate(new Date(date));
  };

  const emptyFoodLog = () => {
    return {
      id: getDaysSinceEpoch(selectedDate),
      beef: 0,
      chicken: 0,
      plant: 0,
    };
  };

  const getFoodLog = () => {
    const dayFromEpoch = getDaysSinceEpoch(selectedDate);
    const log = foodLogs[dayFromEpoch];
    return log ? log : emptyFoodLog();
  };

  const getLoggedDates = (date) => {
    const dayFromEpoch = getDaysSinceEpoch(new Date(date)).toString();
    if (Object.keys(foodLogs).includes(dayFromEpoch)) {
      return {
        dots: [
          {
            color: "green",
          },
        ],
      };
    }
    return {};
  };

  const blacklistDates = (date) => {
    const currentDate = new Date();
    const targetDate = new Date(date);
    return targetDate > currentDate;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CalendarStrip
        scrollable
        style={{ height: 100, paddingTop: 10, paddingBottom: 10 }}
        iconLeft={null}
        iconRight={null}
        daySelectionAnimation={{
          type: "border",
          duration: 200,
          borderWidth: 1,
          borderHighlightColor: "black",
        }}
        selectedDate={selectedDate}
        onDateSelected={onDateSelected}
        markedDates={getLoggedDates}
        datesBlacklist={blacklistDates}
      />

      <Text>{JSON.stringify(getFoodLog())}</Text>

      <Button
        onPress={() =>
          navigation.navigate("Logger", {
            log: getFoodLog(),
          })
        }
        title="Log"
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
  },
});
