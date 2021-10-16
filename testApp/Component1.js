import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

export default function Component1() {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        style={styles.logo}
        source={require("./assets/verticalgarden.jpg")}
      >
        <Text style={styles.text}>Hi</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flex: 1,
  },
  logo: {
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});
