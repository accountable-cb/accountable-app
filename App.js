import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import LoggedIn from "./app/screens/LoggedIn";
import Onboarding from "./app/screens/Onboarding";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
