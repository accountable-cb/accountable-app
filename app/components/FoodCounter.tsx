import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Cow from "../../assets/cow.svg";

interface FoodCounterProps {
  name: string;
  count: number;
  increment: () => void;
}

export const FoodCounter = (props: FoodCounterProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.increment}>
      <Cow height="100" width="100"></Cow>
      <Text style={{ fontWeight: "bold" }}>
        {props.name}: {props.count}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "45%",
    aspectRatio: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
  },
});
