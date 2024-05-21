import { Text, Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import CalendarStrip from "react-native-calendar-strip";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getDateFromDayNumber,
  getDaysSinceEpoch,
  getFormattedDate,
} from "../utils/date";
import { emptyFoodLog } from "../utils/definitions";
import { useData } from "../contexts/UserDataContext";

const Home = ({ navigation }) => {
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    } else if (user.onboarded) {
      navigation.navigate("TabNavigator");
    }
  }, [user, navigation]);
  const { data } = useData();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDateSelected = (date) => {
    setSelectedDate(new Date(date));
  };

  const getFoodLog = () => {
    const dayFromEpoch = getDaysSinceEpoch(selectedDate);
    const log = data[dayFromEpoch];
    return log ? log : emptyFoodLog(selectedDate);
  };

  const markedDatesArray = () => {
    const result = Object.keys(data).map((dayFromEpoch) => {
      return {
        date: getFormattedDate(getDateFromDayNumber(Number(dayFromEpoch))),
        dots: [
          {
            color: "green",
          },
        ],
      };
    });
    return result;
  };

  const blacklistDates = (date) => {
    const currentDate = new Date();
    const targetDate = new Date(date);
    return targetDate > currentDate;
  };

  if (data === undefined) {
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
        markedDates={markedDatesArray()}
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
