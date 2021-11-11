import React from "react";
import { StyleSheet, Text } from "react-native";

const HeaderText = ({ headerText }) => {
  return (
    <Text style={styles.text} numberOfLines={2}>
      {headerText}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "500",
    fontSize: 18,
    width: 100,
  },
});

export default HeaderText;
