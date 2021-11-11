import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { auth, db } from "../firebase";
import { ScrollView } from "react-native-gesture-handler";
import LoggedExerciseItem from "../components/LoggedExerciseItem";
import HeaderText from "../components/HeaderText";

const LoggedWorkoutScreen = ({ navigation, route }) => {
  const [exercises, setExercises] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.workoutName,
      headerTitle: () => <HeaderText headerText={route.params.workoutName} />,
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <Text style={{ color: "white" }}>{route.params.date}</Text>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    //Get logged exercises for this workout
    const unsubscribe = db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("loggedWorkouts")
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
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        {exercises.map(({ id, data }) => (
          <LoggedExerciseItem key={id} data={data} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoggedWorkoutScreen;
