import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";

function LoadingOverlay() {
  return (
    <View style={styles.loadingAnima}>
      <View>
        <LottieView
          style={styles.animationView}
          source={require("../../assets/animation/LoginSuccessFull.json")}
          autoPlay
          loop
        />
      </View>
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  loadingAnima: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animationView: {
    width: 200,
    height: 200,
  },
});
