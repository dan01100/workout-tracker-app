import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";

const ExerciseItem = ({ id, data, updateFields, alertDeleteExercise }) => {
  return (
    <ListItem
      onLongPress={() => alertDeleteExercise(id, data.exerciseName)}
      bottomDivider
    >
      <View style={styles.container}>
        <TextInput
          style={[
            styles.name,
            Platform.OS === "web" && { outlineStyle: "none" },
          ]}
          placeholder="Exercise Name"
          value={data.exerciseName}
          onChangeText={(text) => updateFields(id, "exerciseName", text)}
        />

        <View style={styles.innerContainer}>
          <TextInput
            keyboardType="number-pad"
            style={[
              styles.input,
              Platform.OS === "web" && { outlineStyle: "none" },
            ]}
            placeholder="0"
            value={data.weight}
            onChangeText={(text) => updateFields(id, "weight", text)}
          />
          <Text style={styles.text}>kg</Text>
          <TextInput
            keyboardType="number-pad"
            style={[
              styles.input,
              Platform.OS === "web" && { outlineStyle: "none" },
            ]}
            placeholder="0"
            value={data.sets}
            onChangeText={(text) => updateFields(id, "sets", text)}
          />
          <Text style={styles.text}>sets</Text>
          <TextInput
            keyboardType="number-pad"
            style={[
              styles.input,
              Platform.OS === "web" && { outlineStyle: "none" },
            ]}
            placeholder="0"
            value={data.reps}
            onChangeText={(text) => updateFields(id, "reps", text)}
          />
          <Text style={styles.text}>reps</Text>
        </View>
      </View>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
  },
  name: {
    color: "#2C6BED",
    fontWeight: "600",
    marginBottom: 20,
    width: "100%",
    textAlign: "center",
    fontSize: 18,
  },
  innerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    textAlign: "right",
    width: "10%",
    marginRight: 5,
    fontSize: 18,
  },
  text: {
    marginRight: 20,
    display: "flex",
    color: "#2C6BED",
    fontSize: 18,
  }
});

export default ExerciseItem;
