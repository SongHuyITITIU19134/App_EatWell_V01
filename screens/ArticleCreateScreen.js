import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import InputArticle from "../components/Auth/InputArticle";
import { addArticleUser } from "../ulti/httpRequest/http";
import KeyPointsModal from "./KeyPointsModal";

export default function ArticleCreateScreen({ navigation, route }) {
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [intro, setIntro] = useState("");
  const [ingredients, setIngredient] = useState("");
  const [instruction, setInstruction] = useState("");
  const [isPost, setIsPost] = useState(true);
  const [isKeyPointsModalVisible, setKeyPointsModalVisible] = useState(false);
  const [isSelected, setSelected] = useState(false);

  const showKeyPointsModal = () => {
    setKeyPointsModalVisible(true);
    setSelected(true);
  };

  const hideKeyPointsModal = () => {
    setKeyPointsModalVisible(false);
  };

  const handlePost = async () => {
    if (isPost) {
      const postArticle = {
        tags: tags,
        intro: intro,
        ingredients: ingredients,
        instructions: instruction,
        image: image,
      };
      await addArticleUser(postArticle);

      if (route.params?.onGoBack) {
        route.params.onGoBack();
      }
      navigation.goBack();
    }
  };

  function inputValueArticle(inputType, enteredValue) {
    switch (inputType) {
      case "introduction":
        setIntro(enteredValue);
        break;
      case "ingredients":
        setIngredient(enteredValue);
        break;
      case "tags":
        setTags(enteredValue);
        break;
      case "instruction":
        setInstruction(enteredValue);
        break;
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const SELECTION = [
    {
      id: 1,
      header: "Introduction",
      items: [
        {
          text: "What is your dish ?",
        },
      ],
      icon: (
        <View>
          <Ionicons name="information-circle-outline" size={22} color="black" />
        </View>
      ),
    },
    {
      id: 2,
      header: "Ingredients",
      items: [
        {
          text: "What is your ingredient ?",
        },
      ],
      icon: (
        <MaterialCommunityIcons
          name="food-apple-outline"
          size={22}
          color="black"
        />
      ),
    },
    {
      id: 3,
      header: "Instruction",
      items: [
        {
          text: "What is your instruction ? Please enter step by step",
        },
      ],
      icon: <MaterialIcons name="menu-book" size={22} color="black" />,
    },
  ];

  const [value, setValue] = React.useState(0);
  const { tabs, items } = React.useMemo(() => {
    return {
      tabs: SELECTION.map(({ header, items: subItems, icon }) => ({
        name: header,
        icon: icon,
      })),
      items: SELECTION[value].items,
    };
  }, [value]);

  const onSaveTags = (tags) => {
    setTags(tags);
  };

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
            <Text style={styles.text}>Post</Text>
            <Entypo name="publish" size={24} color="white" />
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
          <View>
            <Text style={styles.textFont}>User's name</Text>
          </View>

          {/* Input for Tags */}
          {tags &&
            Array.isArray(tags) &&
            tags.map((tag, index) => (
              <View style={styles.keyPoint}>
                <View key={index} style={styles.highlightKeyPoint}>
                  <Text>{tag}</Text>
                </View>
              </View>
            ))}

          {isSelected && tags ? (
            <View></View>
          ) : (
            <TouchableOpacity
              onPress={showKeyPointsModal}
              style={styles.inputTag}
            >
              <View style={styles.buttonTags}>
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color="black"
                  onPress={showKeyPointsModal}
                />
                <Text>Select your tags </Text>
              </View>
            </TouchableOpacity>
          )}

          {/* KeyPointsModal */}
          <KeyPointsModal
            isVisible={isKeyPointsModalVisible}
            onClose={hideKeyPointsModal}
            onSaveTags={onSaveTags}
          />
        </View>
      </View>

      {/* Image Post */}
      <View style={styles.imagePost}>
        {image ? (
          <View style={styles.imageArticle}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={{ uri: image }}
                style={[styles.image, styles.selectedImage]}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <Button
            title="Pick an image from camera roll"
            onPress={pickImage}
            style={styles.button}
            color="#4CAF50"
          />
        )}
      </View>

      {/* Main body */}
      <View style={styles.containerMain}>
        <View style={styles.tabs}>
          {tabs.map(({ name, text, icon }, index) => {
            const isActive = index === value;
            return (
              <View
                key={name}
                style={[
                  styles.tabWrapper,
                  isActive && { borderBottomColor: "#0f7104" },
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    setValue(index);
                  }}
                >
                  <View style={styles.tab}>
                    {icon}
                    <Text
                      style={[styles.tabText, isActive && { color: "#0f7104" }]}
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
            <View style={styles.input}>
              <InputArticle
                onUpdateValue={inputValueArticle.bind(this, "introduction")}
                value={intro}
                keyboardType="text"
                placeHolder="What is your dish ?"
              />
            </View>
          </View>
        )}
        {value === 1 && (
          <View>
            <InputArticle
              onUpdateValue={inputValueArticle.bind(this, "ingredients")}
              value={ingredients}
              keyboardType="text"
              placeHolder="What is your ingredient ?"
            />
          </View>
        )}
        {value === 2 && (
          <View>
            <InputArticle
              onUpdateValue={inputValueArticle.bind(this, "instruction")}
              value={instruction}
              keyboardType="text"
              placeHolder="What is your instruction ? Please enter step by step"
            />
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
    backgroundColor: "#0f7104",
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
  inputTag: {
    marginTop: 20,
  },
  text: {
    fontSize: hp(1.8),
    marginRight: 10,
    color: "white",
  },
  tabText: {
    fontSize: hp(1.5),
  },
  imageInner: {
    width: hp(6.4),
    height: hp(6.4),
  },
  button: {
    color: "#4CAF50",
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  image: {
    width: 500,
    height: 600,
    borderRadius: 10,
  },
  selectedImage: {
    width: 400,
    height: 250,
    borderRadius: 10,
  },
  selectedImageContainer: {
    marginTop: 10,
    marginBottom: 40,
  },
  userInfor: {
    marginTop: 15,
    flexDirection: "row",
  },
  userInforTag: {
    marginLeft: 7,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imagePost: {
    height: hp(20),
    marginBottom: 10,
    marginTop: 10,
    position: "relative",
  },
  icon: {
    justifyContent: "center",
    alignContent: "center",
  },
  image: {
    height: hp(15),
    width: hp(20),
  },
  highlightKeyPoint: {
    backgroundColor: "#fde995",
    color: "#000000",
    borderRadius: 20,
    padding: 5,
    borderRadius: 10,
    marginRight: 5,
    marginLeft: 5,
    width: 90,
  },
  keyPoint: {
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 20,
 
  },
  buttonTags: {
    marginTop: 10,
    alignContent: 'center',
    backgroundColor: '#4d8f77',
    padding: 7,
    borderRadius: 10,
    width: 110,
    flexDirection: "row",
    justifyContent: "space-between",
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
    marginTop: 40,
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
  imageArticle: {
    position: "relative",
    marginLeft: 5,
  },
  buttonArticle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
});
