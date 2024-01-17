import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import BottomNav from "../components/ui/BottomNav";
import { deleteArticleUser, fetchArticleUser } from "../ulti/httpRequest/http";

export default DetailArticleScreen = ({ route }) => {
  const { itemId } = route.params;
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [articlesList, setArticlesList] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [editedTags, setEditedTags] = useState(itemId.tagsArticles);
  const [editedIntro, setEditedIntro] = useState(itemId.introArticles);
  const [editedIngredients, setEditedIngredients] = useState(
    itemId.ingredientsArticle
  );
  const [editedInstruction, setEditedInstruction] = useState(
    itemId.instructionArticles
  );
  const [editedImage, setEditedImage] = useState(itemId.imageArticle);

  useLayoutEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const articleData = await fetchArticleUser();
      setArticlesList(articleData);
    } catch (error) {
      console.error("Error fetching article data:", error.message);
    }
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const deleteArticle = async (id) => {
    try {
      const response = await deleteArticleUser(id);
      console.log("delete", id);
      console.log("Article deleted successfully:", response.data);

      // Move these statements inside the try block
      toggleModal();
      navigation.goBack();

      return response.data;
    } catch (error) {
      console.error("Error deleting article:", error);
      throw error;
    }
  };
  const SELECTION = [
    { id: 1, header: "Introduction", items: [{ text: itemId.introArticles }] },
    {
      id: 2,
      header: "Ingredients",
      items: [{ text: itemId.ingredientsArticle }],
    },
    {
      id: 3,
      header: "Instruction",
      items: [{ text: itemId.instructionArticles }],
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

  const handleBack = () => {
    navigation.goBack();
  };
  const handleEdit = () => {
    setEdit(true);
    setModalVisible(false);
  };
  const handleSave = () => {
    setEdit(false);
  };

  return (
    <View style={styles.container}>
      {/* Image Post */}
      <View style={styles.imagePost}>
        <Image source={{ uri: editedImage }} style={styles.image} />
        <View style={styles.buttonHeader}>
          <View style={styles.buttonBack}>
            <TouchableOpacity onPress={handleBack}>
              <Ionicons
                name="ios-arrow-back-circle-outline"
                size={35}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonEdit}>
            <TouchableOpacity onPress={toggleModal}>
              <MaterialCommunityIcons
                name="dots-horizontal-circle-outline"
                size={32}
                color="black"
              />
            </TouchableOpacity>
            <Modal isVisible={isModalVisible} backdropColor="#000000">
              <View style={styles.modalContainer}>
                {isEdit ? (
                  // Render Save button when in edit mode
                  <View style={styles.modalButtonContainer}>
                    <Button
                      title="Save"
                      onPress={handleSave}
                      color="#00ccff"
                      fontSize={20}
                    />
                  </View>
                ) : (
                  <View style={styles.modalButtonContainer}>
                    <View style={styles.editButton}>
                      <Button
                        title="Edit"
                        onPress={handleEdit}
                        color="#00ccff"
                        fontSize={20}
                      />
                    </View>
                    <View style={styles.deleteButton}>
                      <Button
                        title="Delete"
                        onPress={() => deleteArticle(itemId.id)}
                        color="#FF0000"
                        fontSize={20}
                      />
                    </View>
                    <View style={styles.modalClose}>
                      <Button title="Cancel" onPress={toggleModal} />
                    </View>
                  </View>
                )}
              </View>
            </Modal>
          </View>
        </View>

        <View style ={ styles.userInf}> 
        <Text>User's Name </Text>
       </View>

        <View style={styles.tagsUser}>
          {isEdit ? (
            <TextInput
              style={styles.fontText}
              value={editedTags}
              onChangeText={(text) => setEditedTags(text)}
            />
          ) : (
            <View style={styles.tagsUser}>
              {editedTags.map((tag, index) => (
                <View key={index} style={styles.tagWrapper}>
                  <Text style={styles.fontText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Main body */}

      <View style={styles.containerMain}>
   
        {/* Tabs */}
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
        {/* Render items based on the selected tab */}
        <View style={styles.content}>
          {items.map((item, index) => (
            <View key={index}>
              {isEdit ? (
                <TextInput
                  style={styles.fontText}
                  value={
                    index === 0
                      ? editedIntro
                      : index === 1
                      ? editedIngredients
                      : editedInstruction
                  }
                  onChangeText={(text) => {
                    if (index === 0) {
                      setEditedIntro(text);
                    } else if (index === 1) {
                      setEditedIngredients(text);
                    } else {
                      setEditedInstruction(text);
                    }
                  }}
                />
              ) : (
                <View style={styles.content}>
                  {items.map((item, index) => (
                    <Text key={index}>{item.text}</Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Button  */}
      {isEdit ? (
        <View style={styles.modalButtonContainer}>
          <View style={styles.saveButton}>
            <Button
              title="Save"
              onPress={handleSave}
              color="#00ff1e"
              fontSize={20}
            />
          </View>
        </View>
      ) : (
        <BottomNav />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignContent: "flex-end",
  },
  userInf:{
    marginTop: 10,
    marginLeft: 10,
  },
  imagePost: {
    position: "relative",
  },
  buttonHeader: {
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    justifyContent: "space-between",
  },
  buttonBack: {
    marginTop: 5,
  },
  buttonEdit: {
    marginTop: 5,
    alignItems: "flex-end",
  },
  tagsUser: {
    marginLeft: 10,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tagWrapper: {
    backgroundColor: "#FFD700",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  fontText: {
    fontSize: 16,
    color: "#000", // Default text color
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
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  icon: {
    justifyContent: "center",
    alignContent: "center",
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
    marginTop: 10,
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
  buttonArticle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  content: {
    marginLeft: 10,
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
  fontText: {
    fontSize: 15,
  },
  // modal
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalButtonContainer: {
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: "#393939",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#9b9b9b",
    padding: 10,
  },
  deleteButton: {
    backgroundColor: "#393939",
    padding: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  modalClose: {
    marginTop: 20,
    backgroundColor: "#393939",
    padding: 5,
    borderRadius: 10,
  },
  saveButton: {
    marginTop: 330,
    backgroundColor: "#01652c",
    padding: 5,
    borderRadius: 10,
  },
});
