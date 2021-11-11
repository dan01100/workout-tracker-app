import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { auth, db } from "../firebase";
import { Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LoggedWorkoutItem from "../components/LoggedWorkoutItem";
import { Alert } from "react-native";
import firebase from "firebase";

const WorkoutLogScreen = ({ navigation }) => {
  const [loggedWorkouts, setloggedWorkouts] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Workout Log",
    });
  }, [navigation]);

  useEffect(() => {
    const formatTimestamp = (timestamp) => {
      if (timestamp == null) {
        timestamp = firebase.firestore.Timestamp.now();
      }
      const date = timestamp.toDate();
      let month = "" + (date.getMonth() + 1);
      let day = "" + date.getDate();
      let year = date.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [day, month, year].join("/");
    };

    //Get Logged Workouts
    const unsubscribe = db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("loggedWorkouts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setloggedWorkouts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            workoutName: doc.data().workoutName,
            date: formatTimestamp(doc.data().timestamp),
          }))
        )
      );
    return unsubscribe;
  }, []);

  const enterLoggedWorkout = (id, workoutName, date) => {
    navigation.navigate("LoggedWorkout", {
      id,
      workoutName,
      date,
    });
  };

  //Alert user when deleting workout
  const alertDeleteLoggedWorkout = (id, workoutName) => {
    if (Platform.OS === "web") {
      if (confirm("Delete " + workoutName + "?")) {
        deleteLoggedWorkout(id);
      }
      return;
    }

    Alert.alert("Delete Log:", workoutName, [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "Delete", onPress: () => deleteLoggedWorkout(id) },
    ]);
  };

  const deleteLoggedWorkout = (id) => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("loggedWorkouts")
      .doc(id)
      .delete();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        {loggedWorkouts.map(({ id, workoutName, date }) => (
          <LoggedWorkoutItem
            key={id}
            id={id}
            workoutName={workoutName}
            date={date}
            alertDeleteLoggedWorkout={alertDeleteLoggedWorkout}
            enterLoggedWorkout={enterLoggedWorkout}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutLogScreen;
