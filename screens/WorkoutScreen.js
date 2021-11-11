import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { SafeAreaView, Alert } from "react-native";
import { KeyboardAvoidingView, Button } from "react-native";
import { auth, db } from "../firebase";
import firebase from "firebase";
import { Platform } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import ExerciseItem from "../components/ExerciseItem";
import { AppState } from "react-native";
import HeaderText from "../components/HeaderText";
import WorkoutScreenHeaderRight from "../components/WorkoutScreenHeaderRight";

const WorkoutScreen = ({ navigation, route }) => {
  const [exercises, setExercises] = useState([]);
  const [lastLogged, setLastLogged] = useState(0);

  const exercisesRef = useRef(null);
  exercisesRef.current = exercises;

  useEffect(() => {
    exercisesRef.current = exercises;
  }, [exercises]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.workoutName,
      headerTitle: () => <HeaderText headerText={route.params.workoutName} />,
      headerRight: () => (
        <WorkoutScreenHeaderRight addExercise={addExercise} log={log} />
      ),
    });
  }, [navigation, exercises, lastLogged]);

  useEffect(() => {
    //Get Exercises
    const unsubscribe = db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("workouts")
      .doc(route.params.id)
      .collection("exercises")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setExercises(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return () => {
      unsubscribe();
      save();
    };
  }, []);

  useEffect(() => {
    //Save when user closes window / app
    if (Platform.OS === "web") {
      window.addEventListener("beforeunload", save);
    }

    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "background" || nextAppState === "inactive") {
        save();
      }
    };
    AppState.addEventListener("change", handleAppStateChange);

    return () => {
      if (Platform.OS === "web") {
        window.removeEventListener("beforeunload", save);
      }
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  const addExercise = () => {
    setExercises((previousExercises) => [
      ...previousExercises,
      {
        id: Date.now() + Math.random() + "",
        data: {
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          exerciseName: "",
          weight: "",
          sets: "",
          reps: "",
        },
      },
    ]);
  };

  const updateFields = (exerciseId, fieldName, newValue) => {
    setExercises((previousExercises) =>
      previousExercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            id: exercise.id,
            data: { ...exercise.data, [fieldName]: newValue },
          };
        } else {
          return exercise;
        }
      })
    );
  };

  //log workout button
  const log = () => {
    if (Date.now() - lastLogged < 1000) {
      return;
    }
    save();
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("loggedWorkouts")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        workoutName: route.params.workoutName,
      })
      .then((docRef) => {
        for (let i = 0; i < exercises.length; i++) {
          docRef.collection("exercises").add(exercises[i].data);
        }
      });
    setLastLogged(Date.now());
  };

  //save current exercises
  const save = () => {
    const ref = db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("workouts")
      .doc(route.params.id)
      .collection("exercises");
    for (let i = 0; i < exercisesRef.current.length; i++) {
      ref.doc(exercisesRef.current[i].id).set(exercisesRef.current[i].data);
    }
  };

  const alertDeleteExercise = (exerciseId, exerciseName) => {
    if (Platform.OS === "web") {
      if (confirm("Delete " + exerciseName + "?")) {
        deleteExercise(exerciseId);
      }
      return;
    }

    Alert.alert("Delete Exercise:", exerciseName, [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "Delete", onPress: () => deleteExercise(exerciseId) },
    ]);
  };

  const deleteExercise = (exerciseId) => {
    setExercises((previousExercises) =>
      previousExercises.filter((exercise) => exercise.id !== exerciseId)
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView>
        <ScrollView>
          {exercises.map(({ id, data }) => (
            <ExerciseItem
              key={id}
              id={id}
              data={data}
              updateFields={updateFields}
              alertDeleteExercise={alertDeleteExercise}
            />
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default WorkoutScreen;
