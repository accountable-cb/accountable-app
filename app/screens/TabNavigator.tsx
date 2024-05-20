import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import User from "./User";
import Home from "./Home";
import { UserDataProvider } from "../contexts/UserDataContext";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <UserDataProvider>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Today"
          component={Home}
          options={{
            headerShown: false,
            tabBarLabel: "Today",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="User"
          component={User}
          options={{
            headerShown: false,
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </UserDataProvider>
  );
}

export default TabNavigator;
