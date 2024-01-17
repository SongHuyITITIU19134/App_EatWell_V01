import LottieView from "lottie-react-native";
import { StyleSheet, Text, View } from "react-native";

export default OverLoadingScreen = ({ text }) => (
  <View style={styles.container}>
    <LottieView
      source={require("../../assets/animation/RecipeLoading.json")}
      loop
      autoPlay
      duration={5000}
      style={styles.animation}
    />
    {text && <Text style={styles.text}>{text}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 400,
    height: 800,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: "#C58940",
  },
});
