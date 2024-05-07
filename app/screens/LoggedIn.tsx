import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const LoggedIn = () => {
  return (
    <View style={styles.container}>
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
    </View>
  );
};

export default LoggedIn;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
});
