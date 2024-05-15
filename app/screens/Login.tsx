import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import Plant1 from "../../assets/plant1.svg";
import Plant2 from "../../assets/plant2.svg";
import BackgroundPattern from "../../assets/background1.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Sign in failed " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      alert("Check your email");
    } catch (error) {
      console.log(error);
      alert("Sign up failed " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <BackgroundPattern style={{ position: "absolute", right: 0 }} />
          <Plant1 style={{ position: "absolute", right: 50 }} />
          <Plant2 style={{ position: "absolute", left: 50 }} />
        </View>
        <View style={styles.bottomSection}></View>
        <View style={styles.overlaySection}>
          <KeyboardAvoidingView behavior="padding">
            <Text style={styles.title}>Log in</Text>
            <TextInput
              style={styles.input}
              value={email}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            ></TextInput>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              value={password}
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                <Button title="Login" onPress={signIn} />
                <Button title="Create Account" onPress={signUp} />
              </>
            )}
          </KeyboardAvoidingView>
        </View>
      </View>
    </>
  );
};

export default Login;

const windowWidth = Dimensions.get("window").width;
const inputPaddingHorizontal = 10; // Total horizontal padding for the input
const inputMarginHorizontal = 8; // Total horizontal margin for the input if any

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  topSection: {
    backgroundColor: "green",
    height: 215,
  },
  bottomSection: {
    backgroundColor: "white",
    flex: 1,
    marginTop: -40,
    borderTopLeftRadius: windowWidth * 2,
    borderTopRightRadius: windowWidth * 2,
    width: windowWidth * 3,
    marginLeft: -windowWidth,
  },
  overlaySection: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth,
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
    width: windowWidth - 2 * (inputPaddingHorizontal + inputMarginHorizontal),
    paddingHorizontal: inputPaddingHorizontal,
  },
  title: {
    textAlign: "center",
    fontSize: 32,
    paddingBottom: 32,
  },
});
