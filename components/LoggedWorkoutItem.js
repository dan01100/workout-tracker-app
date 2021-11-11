import React from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

const LoggedWorkoutItem = ({
  id,
  workoutName,
  date,
  enterLoggedWorkout,
  alertDeleteLoggedWorkout,
}) => {
  return (
    <ListItem
      onPress={() => enterLoggedWorkout(id, workoutName, date)}
      onLongPress={() => alertDeleteLoggedWorkout(id, workoutName)}
      bottomDivider
    >
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{workoutName}</ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>{date}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: "#2C6BED",
  },
  subtitle: {
    fontSize: 14,
  },
});

export default LoggedWorkoutItem;
