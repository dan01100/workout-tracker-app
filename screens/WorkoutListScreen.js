import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Alert } from "react-native";
import { View, SafeAreaView } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import firebase from "firebase";
import { auth, db } from "../firebase";
import WorkoutItem from "../components/WorkoutItem";
import WorkoutItemInput from "../components/WorkoutItemInput";

const WorkoutListScreen = ({ navigation }) => {
  const [workouts, setWorkouts] = useState([]);
  const [displayInput, setDisplayInput] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Workouts",
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <Button onPress={() => setDisplayInput(true)} title="New Workout" />
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    //Get workouts belonging to user
    const unsubscribe = db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("workouts")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setWorkouts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            workoutName: doc.data().workoutName,
          }))
        )
      );
    return unsubscribe;
  }, []);

  const enterWorkout = (id, workoutName) => {
    navigation.navigate("Workout", {
      id,
      workoutName,
    });
  };

  const addWorkout = (workoutName) => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("workouts")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        workoutName: workoutName,
      });
    setDisplayInput(false);
  };

  const deleteWorkout = (workoutId) => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("workouts")
      .doc(workoutId)
      .delete();
  };

  //Alert user when deleting workout
  const alertDeleteWorkout = (id, workoutName) => {
    if (Platform.OS === "web") {
      if (confirm("Delete " + workoutName + "?")) {
        deleteWorkout(id);
      }
      return;
    }

    Alert.alert("Delete Workout:", workoutName, [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "Delete", onPress: () => deleteWorkout(id) },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView>
        <ScrollView keyboardShouldPersistTaps={"handled"}>
          {workouts.map(({ id, workoutName }) => (
            <WorkoutItem
              key={id}
              id={id}
              workoutName={workoutName}
              enterWorkout={enterWorkout}
              alertDeleteWorkout={alertDeleteWorkout}
            />
          ))}

          {displayInput && (
            <WorkoutItemInput
              addWorkout={addWorkout}
              closeInput={() => setDisplayInput(false)}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default WorkoutListScreen;
