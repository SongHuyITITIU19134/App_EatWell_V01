import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Button,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function PostForm({ articles, index }) {
  const navigation = useNavigation();

  const [isLiked, setLiked] = useState(false);
  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [commentCount, setCommentCount] = useState(0);

  const handleLike = (itemId) => {
    setLiked(!isLiked);
    console.log(itemId);
  };

  const handleComment = () => {
    setCommentModalVisible(true);
  };

  const handleShare = () => {
    // Implement share logic here
    console.log("Share clicked");
  };

  const handleDownload = () => {
    // Implement download logic here
    console.log("Download clicked");
  };

  const handleCommentSave = async () => {
    setCommentModalVisible(false);
    setCommentCount(commentCount + 1);
  };

  const handleViewPost = (itemId) => {

    navigation.navigate("DetailArticleScreen", { itemId });
  };

  const [showFullText, setShowFullText] = useState(false);
  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        {/* Avatar */}
        <View style={styles.avatar}>
          <Image
            source={require("../../assets/animation/Image/icon-user.png")}
            style={styles.avatarImage}
          />
        </View>
        {/* Name User */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>User's Name</Text>
          <Text style={styles.postTime}>2h ago</Text>
        </View>

        {/* keyPoint */}
        <View style={styles.keyPoint}>
          {Array.isArray(item.tagsArticles) ? (
            item.tagsArticles.map((tag, index) => (
              <View style={styles.highlightKeyPoint} key={index}>
                <Text style={styles.tagText}>{tag.trim()}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.tagText}>{item.tagsArticles}</Text>
          )}
        </View>
      </View>
      {/* Content */}
      <View style={styles.containerContent}>
        <Text style={styles.fontText}>
          {showFullText
            ? item.introArticles
            : `${item.introArticles.slice(0, 200)}...`}
        </Text>
        {!showFullText && (
          <TouchableOpacity onPress={toggleShowFullText}>
            <Text style={styles.seeMore}>See more</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Image */}
      <View style={styles.imageMain}>
        <TouchableOpacity onPress={() => handleViewPost(item)} key={item.id}>
          <Image
            source={{ uri: item.imageArticle }}
            style={styles.imageInner}
          />
        </TouchableOpacity>
      </View>
      {/* Button  */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonsRight}>
          <TouchableOpacity
            onPress={() => handleLike(item)}
            key={item.id}
            style={styles.iconButton}
          >
            <FontAwesome
              name={isLiked ? "heart" : "heart-o"}
              size={24}
              color={isLiked ? "blue" : "black"}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleComment} style={styles.iconButton}>
            <MaterialCommunityIcons
              name="comment-processing-outline"
              size={28}
              color="black"
            />
            {commentCount > 0 && (
              <Text style={styles.commentCount}>{commentCount}</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleShare} style={styles.iconButton}>
            <AntDesign name="sharealt" size={28} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsLeft}>
          <TouchableOpacity onPress={handleDownload} style={styles.iconButton}>
            <AntDesign name="download" size={28} color="black" />
          </TouchableOpacity>
        </View>
        {/* Comment Modal */}
        <Modal
          visible={isCommentModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View
            style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 10 }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                height: 200,
              }}
            >
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 50,
                }}
              >
                <TextInput
                  placeholder="Enter your comment"
                  value={comment}
                  onChangeText={(text) => setComment(text)}
                />
              </View>
              <View
                style={{
                  backgroundColor: "#3e9a05",
                  borderRadius: 20,
                }}
              >
                <Button
                  title="Save Comment"
                  onPress={handleCommentSave}
                  color="white"
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );

  return (
    <View key={index}>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0", // Lighter background color
    margin: 10,
    padding: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  avatar: {
    marginRight: 10,
  },
  infor: {
    marginLeft: 5,
    marginRight: 60,
  },
  keyPoint: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 5,
    marginLeft: 30,
    borderRadius: 20,
    width: "40%",
  },
  highlightKeyPoint: {
    backgroundColor: "#fde995",
    color: "#000000",
    borderRadius: 20,
    padding: 7,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
    overflow: "visible",
  },
  fontText: {
    fontSize: 16,
    marginRight: 7,
    color: "#333", // Adjust text color
  },
  fontStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222", // Adjust text color
  },
  containerContent: {
    marginTop: 10,
  },
  seeMore: {
    color: "blue",
    fontWeight: "bold",
    marginTop: 5,
  },
  imageInner: {
    marginTop: 15,
    width: "100%", // Take the full width
    height: 200, // Fixed height or use aspect ratio
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    borderTopWidth: 1,
    width: "100%",
    padding: 5,
    borderTopColor: "#838383",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buttonsRight: {
    flexDirection: "row",
    width: "50%", // Adjust width
    justifyContent: "space-between",
  },
  buttonsLeft: {},
  avatarImage: {
    width: hp(6.4),
    height: hp(6.4),
    borderRadius: hp(3.2), // Half of the width/height for a circular avatar
  },
  userInfo: {
    marginLeft: 10,
    marginRight: 20,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  postTime: {
    fontSize: 12,
    color: "#666",
  },
  tagText: {
    color: "#333",
  },
  commentCount: {
    position: "absolute",
    top: -7,
    right: -7,
    color: "blue",
    fontSize: 17,
    fontWeight: "bold",
  },
  iconButton: {
    marginRight: 15, // Adjust spacing between buttons
  },
});
