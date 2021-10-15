import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Component1 from "./Component1";
import Component2 from "./Component2";

export default function App() {
  return (
    <View style={styles.container}>
      <Component1 />
      {/* <Component2 /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
