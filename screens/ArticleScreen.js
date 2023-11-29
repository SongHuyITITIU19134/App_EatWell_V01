import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import PostForm from "../components/ui/PostForm";

export default function ArticleScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.fontSizeHeader}>Article </Text>
        <View style={styles.iconHeader}>
          <TouchableOpacity>
            <AntDesign
              style={styles.iconInner}
              name="search1"
              size={30}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              style={styles.iconInner}
              name="bell-outline"
              size={28}
              color="black"
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons
              style={styles.iconInner}
              name="ios-menu"
              size={28}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Create Content  */}
      <View style={styles.areaCreateContent}>
        <View style={styles.headerArea}>
          <Image
            source={require("../assets/animation/Image/icon-user.png")}
            style={{ width: hp(8), height: hp(8) }}
          />
        </View>
        <View style={styles.contentArea}>
          <TextInput
            placeholder="What's is on your mind?"
            style={styles.textFont}
            placeholderTextColor={"#5d4b4b"}
          />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}
   >
        <ScrollView style={styles.scrollView}    showsVerticalScrollIndicator={false}
      >
        <PostForm />
        <PostForm />
        </ScrollView>
      </View>
  
      {/* User Info */}
      <View style={styles.userInfo}>
        {/* ... Other user info components ... */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    overflow: "hidden",
    marginLeft: 5,
    paddingBottom: 200,
  },
  /* Header */
  header: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  fontSizeHeader: {
    fontSize: 35,
    fontWeight: "bold",
  },
  iconHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconInner: {
    margin: 7,
  },
  /* areaCreateContent */
  areaCreateContent: {
    marginTop: 20,
    width: "99%",
    height: hp(10),

    flexDirection: "row",
    alignItems: "center",
  },
  headerArea: {
    marginLeft: 20,
  },
  contentArea: {
    marginLeft: 20,
    backgroundColor: "#d1cccc",
    width: "72%",
    height: hp(4.2),
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  textFont: {
    fontSize: hp(1.7),
    marginBottom: hp(1),
    paddingLeft: hp(1.5),
  },

  mainContent: {},
  userInfo: {},
  userName: {
    fontSize: 14,
  },
  scrollView: {
    backgroundColor: "#aba7a7",
    width: "99%",
    height: "100%",
  },
});
