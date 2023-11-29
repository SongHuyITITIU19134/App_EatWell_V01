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

export default function SurveyScreen() {
  const navigation = useNavigation();
  const handleDone = () => {
    navigation.navigate("Welcome");
  };

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text>DONE</Text>
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
            backgroundColor: "#fff",
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
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#fff",
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
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#fff",
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
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#fff",
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
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
        ]}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: width * 0.9,
    height: width,
  },
  doneButton: {
    padding: 20,
    // backgroundColor: "white",
    // borderTopLeftRadius: "100%",
    // borderBottomLeftRadius: "100%",
  },
});
