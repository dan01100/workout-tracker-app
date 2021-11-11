import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ListItem } from "react-native-elements";

const WorkoutItemInput = ({ addWorkout, closeInput }) => {
  const [workoutName, setWorkoutName] = useState("");

  return (
    <ListItem bottomDivider>
      <View style={styles.container}>
        <TextInput
          autoFocus={true}
          value={workoutName}
          placeholder="Workout Name"
          onChangeText={(text) => setWorkoutName(text)}
          style={[
            styles.input,
            Platform.OS === "web" && { outlineStyle: "none" },
          ]}
          onSubmitEditing={() => addWorkout(workoutName)}
        />
        <TouchableOpacity onPress={closeInput} style={styles.button}>
          <AntDesign name="delete" size={20} color="#2C6BED" />
        </TouchableOpacity>
      </View>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    fontSize: 18,
    color: "#2C6BED",
    marginLeft: 5,
    flex: 1,
  },
  button: {
    padding: 5,
  }
});

export default WorkoutItemInput;
