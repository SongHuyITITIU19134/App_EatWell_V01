import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const { width, height } = Dimensions.get("window");

export default function OnBoardingScreen() {
  const navigation = useNavigation();
  const handleDone = () => {
    navigation.navigate("Login");
  };

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text style={styles.doneButtonText}>Let's go</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Onboarding
        bottomBarHighlight={false}
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={doneButton}
        containerStyles={{ paddingHorizontal: 40 }}
        pages={[
          {
            backgroundColor: "#72BDA3",
            image: (
              <View>
                <LottieView
                  style={styles.image}
                  source={require("../assets/animation/womancooking.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Welcome to Mealify",
            subtitle: "Your Personalized Meal Planning Companion",
            titleStyles: styles.title,
            subTitleStyles: styles.subtitle,
          },
          {
            backgroundColor: "#A7CC7B",
            image: (
              <View>
                <LottieView
                  style={styles.image}
                  source={require("../assets/animation/WomanCook.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Discover Delicious Recipes",
            subtitle:
              "Explore a variety of healthy and tasty meals tailored to your preferences.",
            titleStyles: styles.title,
            subTitleStyles: styles.subtitle,
          },
          {
            backgroundColor: "#7DA3A5",
            image: (
              <View>
                <LottieView
                  style={styles.image}
                  source={require("../assets/animation/Cooking.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Create Your Custom Meal Plans",
            subtitle:
              "Plan your meals effortlessly with personalized weekly schedules and grocery lists.",
            titleStyles: styles.title,
            subTitleStyles: styles.subtitle,
          },
          {
            backgroundColor: "#5F826A",
            image: (
              <View>
                <LottieView
                  style={styles.image}
                  source={require("../assets/animation/Cooking.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Achieve Your Health Goals",
            subtitle:
              "Mealify helps you stay on track with your nutrition and wellness journey.",
            titleStyles: styles.title,
            subTitleStyles: styles.subtitle,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF", // Background color for the entire screen
  },
  image: {
    width: width * 0.9,
    height: width,
  },
  doneButton: {
    backgroundColor: "#72BDA3", // Color for the "Done" button
    padding: 7,
    borderRadius: 8,
    marginTop: 20,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  doneButtonText: {
    color: "#FFF", // Color for the text in the "Done" button
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    color: "#000000", // Color for the title text
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#FFF", // Color for the subtitle text
    fontSize: 18,
  },
});
