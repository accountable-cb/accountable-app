import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { useAuth } from "../contexts/AuthContext";

const User = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text>USER</Text>
      <Text>{user.email}</Text>
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
});
