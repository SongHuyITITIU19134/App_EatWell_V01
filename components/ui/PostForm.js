import {
    AntDesign,
    FontAwesome5,
    MaterialCommunityIcons,
    SimpleLineIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function PostForm() {
  const textContent =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.";
  const [showFullText, setShowFullText] = useState(false);
  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  return (
   
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          {/* Avatar */}
          <View style={styles.avatar}>
            <Image
              source={require("../../assets/animation/Image/icon-user.png")}
              style={{ width: hp(6.4), height: hp(6.4) }}
            />
          </View>
          {/* Name User */}
          <View style={styles.infor}>
            <Text style={styles.fontStyle}> User's Name</Text>
            <Text style={styles.fontText}>2h ago</Text>
          </View>

          {/* keyPoint */}
          <View style={styles.keyPoint}>
            <Text style={styles.fontText}>Low-Cap</Text>
            <Text style={styles.fontText}>Low-Cap</Text>
            <Text style={styles.fontText}>Low-Cap</Text>
            <Text style={styles.fontText}>Low-Cap</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.containerContent}>
          <Text style={styles.fontText}>
            {showFullText ? textContent : `${textContent.slice(0, 200)}...`}
          </Text>
          {!showFullText && (
            <TouchableOpacity onPress={toggleShowFullText}>
              <Text style={styles.seeMore}>See more</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Image */}
        <View style={styles.imageMain}>
          <Image
            source={require("../../assets/animation/Image/foodPicture.jpg")}
            style={styles.imageInner}
          />
        </View>

        {/* Button  */}
        <View style={styles.buttonContainer}>
          <View style={styles.buttonsRight}>
            <TouchableOpacity>
              <FontAwesome5 name="heart" size={28} color="black" />
            </TouchableOpacity>

            <TouchableOpacity>
              <MaterialCommunityIcons
                name="comment-processing-outline"
                size={28}
                color="black"
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <SimpleLineIcons name="share" size={28} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsLeft}>
            <TouchableOpacity>
            <AntDesign name="download" size={28} color="black" />
            </TouchableOpacity>
           
          </View>
        </View>
      </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#b99494",
    marginTop: 20,
    width: wp(97),
    height: hp(60),
  },
  // Header
  header: {
    flexDirection: "row",
  },
  avatar: {
    marginLeft: 15,
  },
  infor: {
    margin: 10,
  },
  keyPoint: {
    margin: 10,
    marginLeft: 60,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
    width: wp(50),
  },
  fontText: {
    fontSize: 16,
    marginRight: 7,
  },
  fontStyle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  // Content
  containerContent: {
    marginTop: 20,
    marginLeft: 10,
  },
  seeMore: {
    color: "blue",
    marginTop: 5,
  },
  // Image Content
  imageMain: {
    marginTop: 15,
  },
  imageInner: {
    width: hp(45),
    height: hp(25),
    borderRadius: 15,
  },
  // Buttons
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buttonsRight: {
    flexDirection: "row",
    marginLeft: 10,
    width: wp(30),
    justifyContent: "space-between",
  },
  buttonsLeft: {
    marginRight: 10,
  },
});
