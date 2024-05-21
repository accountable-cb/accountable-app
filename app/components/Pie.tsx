import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import PieChart from "react-native-pie-chart";
import { FoodLog } from "../types/definitions";
import { food } from "../data/food";

const { width } = Dimensions.get("window");
const PIE_SIZE = width * 0.8; // Adjust size as needed
const BUTTON_RADIUS = (PIE_SIZE / 2) * 0.7; // Button radius as 70% of the pie radius
const BUTTON_DIAMETER = BUTTON_RADIUS * 2; // Button diameter is twice the radius

interface PieChartProps {
  log: FoodLog;
  logMeal: () => void;
}
const PieChartWithButton = (props: PieChartProps) => {
  const isEmptySeries = (series: number[]): boolean => {
    return series.every((n) => {
      return n === 0;
    });
  };
  const seriesAndColor: [number[], string[]] = [[], []];
  Object.keys(food).forEach((key) => {
    seriesAndColor[0].push(props.log[key]);
    seriesAndColor[1].push(food[key].color);
  });
  return (
    <View style={styles.container}>
      {!isEmptySeries(seriesAndColor[0]) ? (
        <PieChart
          widthAndHeight={PIE_SIZE}
          series={seriesAndColor[0]}
          sliceColor={seriesAndColor[1]}
        />
      ) : (
        <></>
      )}

      <View
        style={[
          styles.buttonContainer,
          {
            width: BUTTON_DIAMETER,
            height: BUTTON_DIAMETER,
            borderRadius: BUTTON_RADIUS,
          },
        ]}
      >
        <TouchableOpacity style={styles.button} onPress={props.logMeal}>
          <Text style={styles.buttonText}>Log Meal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: PIE_SIZE,
    height: PIE_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green", // Adjust the button color if needed
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default PieChartWithButton;
