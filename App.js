import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import WorkoutListScreen from "./screens/WorkoutListScreen";
import WorkoutScreen from "./screens/WorkoutScreen";
import WorkoutLogScreen from "./screens/WorkoutLogScreen";
import LoggedWorkoutScreen from "./screens/LoggedWorkoutScreen";

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#2C6BED" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={globalScreenOptions}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Workout" component={WorkoutScreen} />
        <Stack.Screen name="WorkoutList" component={WorkoutListScreen} />
        <Stack.Screen name="WorkoutLog" component={WorkoutLogScreen} />
        <Stack.Screen name="LoggedWorkout" component={LoggedWorkoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
