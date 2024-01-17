import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function ArticleCreateScreen() {
  const [selectedImage, setSelectedImage] = useState(
    "https://media.istockphoto.com/id/1288385045/photo/snowcapped-k2-peak.jpg?s=612x612&w=0&k=20&c=sfA4jU8KXKZZqQiy@pHlQ4CeDRØDxCxXhtuTDEW8100="
  );

  const navigation = useNavigation();

  const handlePost = () => {
    navigation.navigate("Article");
  };

  const upLoadImage = async () => {
    const result = await launchImageLibrary();
    setSelectedImage(result?.assets[0]?.uri);
  };

  const SELECTION = [
    { id: 1, header: "Introduction", items: [{ text: "What is your dish ?" }] },
    {
      id: 2,
      header: "Ingredients",
      items: [{ text: "What is your ingredient ?" }],
    },
    {
      id: 3,
      header: "Instruction",
      items: [{ text: "What is your instruction ? Please enter step by step" }],
    },
  ];
  const [value, setValue] = React.useState(0);
  const { tabs, items } = React.useMemo(() => {
    return {
      tabs: SELECTION.map(({ header }) => ({
        name: header,
      })),
      items: SELECTION[value].items,
    };
  }, [value]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLeftButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="ios-chevron-back-circle-outline"
              size={30}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerTitle}>
          <Text style={styles.fontTitle}>Create Article</Text>
        </View>
        <TouchableOpacity onPress={handlePost}>
          <View style={styles.headerRightButton}>
            <Text style={styles.textFont}>Post</Text>
            <Entypo name="publish" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      {/* Infor User */}
      <View style={styles.userInfor}>
        {/* User Avatar */}
        <View style={styles.userAvatar}>
          <Image
            source={require("../assets/animation/Image/icon-user.png")}
            style={styles.imageInner}
          />
        </View>
        {/* User Infor & Tags */}
        <View style={styles.userInforTag}>
          <Text style={styles.textFont}>User's name</Text>
          <TextInput style={styles.textFont} placeholder="Your tag"></TextInput>
        </View>
      </View>

      {/* Image Post */}
      <TouchableOpacity onPress={upLoadImage}>
        <View style={styles.imagePost}>
          {/* {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.image} />
          ) : (
            <Feather
              style={styles.icon}
              name="plus-circle"
              size={24}
              color="black"
            />
          )} */}
          <View>
            <Image source={{ uri: selectedImage }} style={styles.image} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Main body */}
      <View style={styles.containerMain}>
        <View style={styles.tabs}>
          {tabs.map(({ name, text }, index) => {
            const isActive = index === value;

            return (
              <View
                key={name}
                style={[
                  styles.tabWrapper,
                  isActive && { borderBottomColor: "#6366f1" },
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    setValue(index);
                  }}
                >
                  <View style={styles.tab}>
                    <MaterialIcons
                      color={isActive ? "#6366f1" : "#6b7280"}
                      name="integration-instructions"
                      size={16}
                    />

                    <Text
                      style={[styles.tabText, isActive && { color: "#6366f1" }]}
                    >
                      {name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        {value === 0 && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter your dish description..."
              multiline
              // Add any necessary onChangeText or other props for handling the input
            />
          </View>
        )}
        {value === 1 && (
          <View>
            <Text>id = 1</Text>
          </View>
        )}
        {value === 2 && (
          <View>
            <Text>id = 2</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginLeft: 10,
    marginRight: 15,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerLeftButton: {},
  headerRightButton: {
    flexDirection: "row",
    backgroundColor: "#766c6c",
    padding: 4,
    borderRadius: 10,
  },
  fontTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  textFont: {
    fontSize: hp(1.8),
    marginRight: 10,
  },
  imageInner: {
    width: hp(6.4),
    height: hp(6.4),
  },
  userInfor: {
    marginTop: 15,
    flexDirection: "row",
  },
  userInforTag: {
    alignContent: "center",
    marginLeft: 7,
  },
  imagePost: {
    backgroundColor: "#6a6767",
    height: hp(20),
  },
  icon: {
    justifyContent: "center",
    alignContent: "center",
  },
  image: {
    height: hp(15),
    width: hp(20),
  },
  tabWrapper: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderColor: "#e5e7eb",
    borderBottomWidth: 2,
  },
  tabs: {
    padding: 16,
    flexDirection: "row",
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    position: "relative",
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    paddingLeft: 24,
    paddingRight: 24,
  },
});
