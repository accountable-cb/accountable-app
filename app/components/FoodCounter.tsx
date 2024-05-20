import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface FoodCounterProps {
  name: string;
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const FoodCounter = (props: FoodCounterProps) => {
  return (
    <View style={styles.container}>
      <Text>{props.name}</Text>
      <TouchableOpacity onPress={props.decrement}>
        <Text>-</Text>
      </TouchableOpacity>
      <Text>{props.count}</Text>
      <TouchableOpacity onPress={props.increment}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
