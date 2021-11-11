import React from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

const WorkoutItem = ({ id, workoutName, enterWorkout, alertDeleteWorkout }) => {
  return (
    <ListItem
      bottomDivider
      onPress={() => enterWorkout(id, workoutName)}
      onLongPress={() => alertDeleteWorkout(id, workoutName)}
    >
      <ListItem.Title style={styles.title}>{workoutName}</ListItem.Title>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: "#2C6BED",
    flex: 1,
    marginVertical: -10,
    paddingVertical: 10,
  },
});

export default WorkoutItem;
