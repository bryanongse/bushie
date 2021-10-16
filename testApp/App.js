import { StatusBar } from "expo-status-bar";
import Component1 from "./Component1";
import Component2 from "./Component2";
import Sendphoto from "./Sendphoto";
import React, { useState, useEffect, useRef } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Button} from "react-native";
import { Camera } from "expo-camera";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [showCamera, setShowCamera] = useState(true);

  // const cam = useRef().current;

  // const _takepicture = async () => {
  //   const option = { quality: 0.5, base64: true, skipProcessing: false };

  //   const picture = cam.takePictureAsyn  c(option);

  //   if (picture.source) {
  //     console.log(picture.source);
  //   }
  // };
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri);
      setImage(data.uri);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      {showCamera ? (
        <ImageBackground
          style={styles.logo}
          source={require("./assets/verticalgarden.jpg")}
          resizeMode="cover"
        >
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
        </ImageBackground>
      ) : (
        <Component2 image={image} />
      )}
      <Button
        title={showCamera ? "Submit" : "Back"}
        onPress={() => {Sendphoto(image); setShowCamera((prev) => !prev);}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    width: 350,
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
  logo: {
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
});
