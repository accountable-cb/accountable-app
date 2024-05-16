import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import LoggedIn from "./app/screens/LoggedIn";
import Onboarding from "./app/screens/Onboarding";
import { AuthProvider, useAuth } from "./AuthContext";

const Stack = createNativeStackNavigator();

function AppContent() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoggedIn"
            component={LoggedIn}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
