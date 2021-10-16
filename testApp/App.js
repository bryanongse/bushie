import { StatusBar } from "expo-status-bar";
import Component2 from "./Component2";
import React, { useState, useEffect, useRef } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Button,
  ScrollView,
  Image,
  TextInput,
} from "react-native";

export default function App() {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [showCamera, setShowCamera] = useState(true);
  const [showModal, setShowModal] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [xCoord, setXCoord] = useState("");
  const [yCoord, setYCoord] = useState("");

  function Sendphoto() {
    fetch("http://192.168.1.166:8080/photo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: image,
    })
      .then((resp) => resp.json())
      .catch((error) => console.log(error));
  }
  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      console.log(data);
      setImage(data.base64);
      setShowModal(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
      const locationStatus = await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(locationStatus.status === "granted");

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location); // get coordinates in the form of {"coords",{"altitude", "altitudeAccuracy", "latitude","accuracy","logitude","heading","speed"}, "timestamp"}
  }
  console.log(text);

  if (
    hasCameraPermission === null ||
    hasGalleryPermission === false ||
    hasLocationPermission === false
  ) {
    return <View />;
  }
  if (
    hasCameraPermission === false ||
    hasGalleryPermission === false ||
    hasLocationPermission === false
  ) {
    return <Text>No access</Text>;
  }
  return (
    <View style={styles.container}>
      {showCamera ? (
        <ImageBackground
          style={styles.bg}
          source={
            image ? { uri: image } : require("./assets/verticalgarden.jpg")
          }
          resizeMode="cover"
        >
          {showModal ? (
            <Camera
              style={styles.camera}
              type={type}
              ref={(ref) => setCamera(ref)}
            >
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                >
                  <Icon name="shuffle" size={50} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.photoBtn}
                  onPress={() => takePicture()}
                >
                  <Icon name="camera" size={50} color="white" />
                </TouchableOpacity>
              </View>
            </Camera>
          ) : (
            <View>
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => setShowModal(true)}
              >
                <Icon name="chevrons-left" size={50} color="white" />
              </TouchableOpacity>
              <TextInput
                style={{
                  height: 40,
                  width: 200,
                  margin: 12,
                  borderWidth: 1,
                  padding: 10,
                  backgroundColor: "white",
                }}
                placeholder="Input X coordinate"
                onChangeText={(xCoord) => setXCoord(xCoord)}
                defaultValue={xCoord}
              />
              <TextInput
                style={{
                  height: 40,
                  width: 200,
                  margin: 12,
                  borderWidth: 1,
                  padding: 10,
                  backgroundColor: "white",
                }}
                placeholder="Input Y coordinate"
                onChangeText={(yCoord) => setYCoord(yCoord)}
                defaultValue={yCoord}
              />
            </View>
          )}
          {/* empty view to see photo */}
        </ImageBackground>
      ) : (
        <Component2 image={image} />
      )}

      <Button title="Send" onPress={() => Sendphoto()} />
      <Button
        title={showCamera ? "Submit" : "Back"}
        onPress={() => setShowCamera((prev) => !prev)}
      />
      <Button title="Pick Image" onPress={() => pickImage()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    width: 370,
    height: 550,
    alignSelf: "center",
    marginTop: 24,
    borderRadius: 30,
    overflow: "hidden",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  button: {
    flex: 0.2,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  photoBtn: {
    flex: 0.2,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: "white",
  },
  bg: {
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
  backBtn: {
    flex: 0.2,
    alignSelf: "flex-end",
    marginTop: -5,
    position: "absolute",
  },
  backBtn: {
    flex: 0.2,
    alignSelf: "flex-end",
    marginTop: -5,
    position: "absolute",
  },
});
