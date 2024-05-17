import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import User from "./User";
import Home from "./Home";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Today"
        component={User}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="User"
        component={Home}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
