import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HoldingScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => navigation.navigate("SurveyScreen"), 3000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerAnima}>
        <LottieView
          style={styles.animaWelcome}
          source={require("../../assets/animation/Welcome.json")}
          autoPlay
          loop
        />
      </View>
      <Text style={styles.text}>Let's Get Some Information </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50", // Updated background color
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  animaWelcome: {
    width: 300,
    height: 250,
  },
  text: {
    fontSize: 30, // Increased font size
    color: "#ecf0f1", // Text color
    marginTop: 20, // Spacing from animation
  },
  containerAnima: {
    marginTop: 50,
  },
});
