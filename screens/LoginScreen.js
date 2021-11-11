import React, { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Button, Input } from "react-native-elements";
import { auth } from "../firebase";
import styles from "./Main.styles.js";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [attemptingLogin, setAttemptingLogin] = useState(false);

  useEffect(() => {
    //Check if user is already logged in
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const login = () => {
    if (attemptingLogin) {
      return;
    } else {
      setAttemptingLogin(true);
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.replace("Home");
      })
      .catch((error) => {
        alert(error);
        setAttemptingLogin(false);
      });
  };

  return (
    <KeyboardAvoidingView
      behaviour="padding"
      style={styles.container}
      keyboardVerticalOffset={50}
    >
      <Text style={styles.title}>Workout Tracker</Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          style={Platform.OS === "web" && { outlineStyle: "none" }}
          onChangeText={(text) => setEmail(text)}
          onSubmitEditing={login}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          style={Platform.OS === "web" && { outlineStyle: "none" }}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={login}
        />
      </View>

      <Button
        containerStyle={styles.button}
        onPress={login}
        disabled={attemptingLogin}
        title="Login"
      />
      <Button
        onPress={() => {
          navigation.replace("Register");
        }}
        containerStyle={styles.button}
        type="outline"
        title="Register"
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
