import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons/faMugSaucer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

const BottomNav = () => {
  const handleHeartPress = () => {
    // Handle heart button press
    console.log("Heart button pressed");
    // Add your custom logic here
  };

  const handleCommentPress = () => {
    // Handle comment button press
    console.log("Comment button pressed");
    // Add your custom logic here
  };

  const handleSharePress = () => {
    // Handle share button press
    console.log("Share button pressed");
    // Add your custom logic here
  };

  const handleDownloadPress = () => {
    // Handle download button press
    console.log("Download button pressed");
    // Add your custom logic here
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleHeartPress}>
        <View style={styles.button}>
          <FontAwesomeIcon icon={faMugSaucer} />
          <FontAwesome name="heart-o" size={24} color="black" />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={handleCommentPress}>
        <View style={styles.button}>
          <MaterialCommunityIcons
            name="comment-processing-outline"
            size={28}
            color="black"
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={handleSharePress}>
        <View style={styles.button}>
          <AntDesign name="sharealt" size={28} color="black" />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={handleDownloadPress}>
        <View style={styles.button}>
          <AntDesign name="download" size={28} color="black" />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#000000",
    paddingVertical: 10,
    marginBottom: 20,
  },
  icon: {
    color: "#d04949",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BottomNav;
