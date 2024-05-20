import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import User from "./User";
import Home from "./Home";
import { UserDataProvider } from "../contexts/UserDataContext";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <UserDataProvider>
      <Tab.Navigator>
        <Tab.Screen
          name="Today"
          component={Home}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="User"
          component={User}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </UserDataProvider>
  );
}

export default TabNavigator;
