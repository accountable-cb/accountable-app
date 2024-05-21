import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart, ContributionGraph } from "react-native-chart-kit";
import { useData } from "../contexts/UserDataContext";
import { FoodLog, daysSinceEpoch } from "../types/definitions";
import { food } from "../data/food";
import {
  getDateFromDayNumber,
  getShortFormattedDate,
  interpolate,
} from "../utils/date";

const Progress = () => {
  const { data } = useData();

  const graphData = () => {
    return Object.values(data)
      .sort((a: FoodLog, b: FoodLog) => daysSinceEpoch(a) - daysSinceEpoch(b))
      .map((log) => {
        let result = 0;
        Object.keys(food).forEach((key) => {
          result = result + log[key] * food[key].CO2E;
        });
        return result;
      });
  };
  const graphLabels = (): string[] => {
    const sortedLogs = Object.values(data).sort(
      (a: FoodLog, b: FoodLog) => daysSinceEpoch(a) - daysSinceEpoch(b)
    );
    const first = sortedLogs[0];
    const last = sortedLogs[sortedLogs.length - 1];
    return interpolate(
      getDateFromDayNumber(Number(first.id)),
      getDateFromDayNumber(Number(last.id)),
      4
    ).map((date: Date) => {
      return getShortFormattedDate(date);
    });
  };
  return (
    <SafeAreaView>
      <Text style={styles.headerText}>Progress</Text>
      <View>
        <LineChart
          data={{
            labels: graphLabels(),
            datasets: [
              {
                data: graphData(),
              },
            ],
          }}
          width={Dimensions.get("window").width}
          height={Dimensions.get("window").height / 3}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#478778",
            backgroundGradientTo: "#90EE90",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 24,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Progress;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
