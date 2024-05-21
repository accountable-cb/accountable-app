import { View, Text, Button, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { useAuth } from "../contexts/AuthContext";

const User = ({ navigation }) => {
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    } else if (user.onboarded) {
      navigation.navigate("TabNavigator");
    }
  }, [user, navigation]);

  return (
    <View style={styles.container}>
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
