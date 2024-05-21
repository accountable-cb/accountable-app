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

const { width } = Dimensions.get("window");
const PIE_SIZE = width * 0.8; // Adjust size as needed
const BUTTON_RADIUS = (PIE_SIZE / 2) * 0.7; // Button radius as 70% of the pie radius
const BUTTON_DIAMETER = BUTTON_RADIUS * 2; // Button diameter is twice the radius

interface PieChartProps {
  log: FoodLog;
  logMeal: () => void;
}
const PieChartWithButton = (props: PieChartProps) => {
  return (
    <View style={styles.container}>
      <PieChart
        widthAndHeight={PIE_SIZE}
        series={[props.log.beef, props.log.chicken, props.log.plant]}
        sliceColor={["#fbd203", "#ffb300", "#ff9100"]}
      />
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
