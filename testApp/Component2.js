import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Component2(props) {
  return (
    <View style={styles.mainContainer}>
      <Image source={{ uri: props.image }} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#90EE90",
    width: "100%",
    flex: 1,
  },
  logo: {
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
});
