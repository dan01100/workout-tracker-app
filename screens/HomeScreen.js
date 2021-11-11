import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import { auth } from "../firebase";
import styles from "./Main.styles.js";

const HomeScreen = ({ navigation }) => {
  const logout = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Tracker</Text>

      <Button
        containerStyle={styles.button}
        onPress={() => {
          navigation.navigate("WorkoutList");
        }}
        title="Workouts"
      />
      <Button
        onPress={() => {
          navigation.navigate("WorkoutLog");
        }}
        containerStyle={styles.button}
        title="Workout Log"
      />
      <Button containerStyle={styles.button} onPress={logout} title="Logout" />
    </View>
  );
};

export default HomeScreen;
