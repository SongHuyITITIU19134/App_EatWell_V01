import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  Animated,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default WelcomeScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => navigation.navigate("Home"), 2500);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* logo image with rings */}
      <Animated.View style={styles.ring2}>
        <Animated.View style={styles.ring1}>
          <Image
            source={require("../assets/animation/Image/logoFood.jpg")}
            style={{ width: 200, height: 200 }}
          />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Foody</Text>
        <Text style={styles.subtitle}>Food is always right</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFC107",
  },
  ring2: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 999,
    padding: 20, // Adjust as needed
  },
  ring1: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 999,
    padding: 10, // Adjust as needed
  },
  textContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "medium",
    color: "white",
    letterSpacing: 2,
  },
});
