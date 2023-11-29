import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native";
import HomeScreen from "../../screens/HomeScreen";
import MealScreen from "../../screens/MealScreen";

const Tab = createBottomTabNavigator();
export default function AppNavigation() {
  return (
    <View>
      <Tab.Navigator >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Meal" component={MealScreen} />
      </Tab.Navigator>
    </View>
  );
}
