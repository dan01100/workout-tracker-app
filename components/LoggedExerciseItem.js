import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";

const LoggedExerciseItem = ({ data }) => {
  return (
    <ListItem bottomDivider>
      <View style={styles.container}>
        <TextInput
          editable={false}
          style={styles.name}
          placeholder="Exercise Name"
          value={data.exerciseName}
        />

        <View style={styles.innerContainer}>
          <TextInput
            editable={false}
            style={styles.input}
            placeholder="0"
            value={data.weight}
          />
          <Text style={styles.text}>kg</Text>
          <TextInput
            editable={false}
            style={styles.input}
            placeholder="0"
            value={data.sets}
          />
          <Text style={styles.text}>sets</Text>
          <TextInput
            editable={false}
            style={styles.input}
            placeholder="0"
            value={data.reps}
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
    color: "black",
    fontSize: 18,
  },
  text: {
    marginRight: 20,
    display: "flex",
    color: "#2C6BED",
    fontSize: 18,
  },
});

export default LoggedExerciseItem;
