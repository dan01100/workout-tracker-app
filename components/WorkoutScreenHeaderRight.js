import React from "react";
import { TouchableOpacity, View, Button } from "react-native";

const WorkoutScreenHeaderRight = ({ addExercise, log }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity style={{ marginRight: 10 }}>
        <Button onPress={addExercise} title="ADD EXERCISE" />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginRight: 10 }}>
        <Button style={{ marginRight: 20 }} onPress={log} title="LOG" />
      </TouchableOpacity>
    </View>
  );
};

export default WorkoutScreenHeaderRight;
