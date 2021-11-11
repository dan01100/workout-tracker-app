import React, { useState } from "react";
import { Platform, Text, View } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Button, Input } from "react-native-elements";
import { auth } from "../firebase";
import styles from "./Main.styles.js";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [attemptingRegister, setAttemptingRegister] = useState(false);

  const register = () => {
    if (attemptingRegister) {
      return;
    } else {
      setAttemptingRegister(true);
    }

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      setAttemptingRegister(false);
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        navigation.replace("Home");
      })
      .catch((error) => {
        setAttemptingRegister(false);
        alert(error.message);
      });
  };

  return (
    <KeyboardAvoidingView
      behaviour="padding"
      style={styles.container}
      keyboardVerticalOffset={50}
    >
      <Text style={styles.subtitle}>Create an account</Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          style={Platform.OS === "web" && { outlineStyle: "none" }}
          onChangeText={(text) => setEmail(text)}
          onSubmitEditing={register}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          style={Platform.OS === "web" && { outlineStyle: "none" }}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={register}
        />
        <Input
          placeholder="Confirm Password"
          secureTextEntry
          type="password"
          value={confirmPassword}
          style={Platform.OS === "web" && { outlineStyle: "none" }}
          onChangeText={(text) => setConfirmPassword(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        containerStyle={styles.button}
        onPress={register}
        disabled={attemptingRegister}
        title="Register"
      />
      <Button
        containerStyle={styles.button}
        onPress={() => {
          navigation.replace("Login");
        }}
        type="outline"
        title="Back to Login"
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
