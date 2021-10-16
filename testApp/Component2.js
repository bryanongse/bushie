import React, { useState, useEffect } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function Component2(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://192.168.1.21:3000/processedphoto", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((processedphoto) => {
        setData(processedphoto);
      })
      .catch((error) => console.log(error));
  });

  function Receiveresults() {
    fetch("http://192.168.1.21:3000/results", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((results) => {
        setData(results);
      })
      .catch((error) => console.log(error));
  }

  function Card(props) {
    return (
      <View style={styles.textBox}>
        <Text style={styles.cardContent}>{props.text}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.mainContainer}>
      <Image source={require("./assets/results.jpeg")} style={styles.logo} />
      <Card text={"Area of Wall: 110 sqft"} />
      <Card text={"Change in Temperature: 1 degree"} />
      <Card text={"Energy Savings: 1848kJ"} />
      <Card text={"Cost savings: 460/kWh"} />
      <Image source={require("./assets/nturesults.png")} style={styles.logo} />
      <Card text={"Area of Wall: 130 sqft"} />
      <Card text={"Change in Temperature: 1.1 degrees"} />
      <Card text={"Energy Savings: 2634kJ"} />
      <Card text={"Cost savings: 480/kWh"} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#90EE90",
    width: "100%",
    flex: 1,
  },
  logo: {
    marginTop: 50,
    height: 300,
    width: 370,
    alignSelf: "center",
    borderRadius: 25,
  },
  textBox: {
    backgroundColor: "#e6ffe6",
    borderRadius: 6,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  cardContent: {
    marginHorizontal: 10,
    marginVertical: 10,
    fontFamily: "System",
    fontWeight: "600",
    fontSize: 18,
    color: "#65a765",
  },
  backBtn: {
    flex: 0.2,
    alignItems: "center",
  },
});
