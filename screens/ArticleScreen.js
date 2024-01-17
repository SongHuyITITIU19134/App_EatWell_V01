import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import PostForm from "../components/ui/PostForm";
import { fetchArticleUser } from "../ulti/httpRequest/http";

export default function ArticleScreen() {
  const navigation = useNavigation();
  const [articles, setArticles] = useState([]);

  const handleCreateArticle = () => {
    navigation.navigate("CreateArticleScreen");
  };

  const fetchDataArticle = async () => {
    try {
      const articleData = await fetchArticleUser();
      setArticles(articleData);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };
  useLayoutEffect(() => {
    fetchDataArticle();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchDataArticle();
    }, [])
  );

  console.log(articles);

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

          <TouchableOpacity onPress={handleCreateArticle}>
            <AntDesign
              style={styles.iconInner}
              name="pluscircleo"
              size={28}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <PostForm articles={articles} />
          </View>
        </ScrollView>
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <Text>User's name</Text>
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
    paddingBottom: 100,
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
    backgroundColor: "#cbcbcb",
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
    fontFamily: "Open Sans",
  },

  mainContent: {},
  userInfo: {},
  userName: {
    fontSize: 14,
  },
  scrollView: {
    width: "99%",
    height: "100%",
  },
});
