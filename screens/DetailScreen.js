import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { CachedImage } from "../components/Tool/CachedImage";

export default function DetailScreen(props) {
  console.log(props.route.params);
  let items = props.route.params;
  const navigation = useNavigation();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    getMealData(items.idMeal);
  }, []);

  const getMealData = async (id) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      //   console.log('got meal data: ',response.data);
      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }

    return indexes;
  };

  return (
    <>
      {loading ? (
        <View style={styles.loadingAnima}>
          <LottieView
            style={styles.loadingAnima}
            source={require("../assets/animation/LoadingIcon.json")}
            autoPlay
            loop
          />
        </View>
      ) : (
        <View style={styles.container}>
          <StatusBar style={"auto"} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            {/* Image of Recipes  */}
            <View style={styles.body}>
              <CachedImage uri={items.strMealThumb} style={styles.images} />
            </View>

            {/* Button Back and Love */}
            <View style={styles.buttonContainer}>
              <View style={styles.buttonBack}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons
                    name="ios-chevron-back-circle-sharp"
                    size={50}
                    color="#fff"
                  />
                </TouchableOpacity>
                <Text style={styles.textFont}>Back to Home</Text>
              </View>

              <View style={styles.buttonLove}>
                <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                  <Ionicons
                    name="ios-heart-circle-outline"
                    size={50}
                    color={isFavorite ? "#ff5dd9" : "#ffffff"}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* meal description */}
            <View style={styles.containerBody}>
              {/* Name & Area  */}
              <View>
                <Text style={styles.textTitle}>{meal?.strMeal}</Text>
                <View style={styles.innerArea}>
                  <Text style={styles.textExplain}>{meal?.strArea}</Text>
                </View>
              </View>

              {/* misc */}
              <View style={styles.containerInner}>
                <View style={styles.elementInner}>
                  <View style={styles.iconInner}>
                    <AntDesign name="clockcircle" size={35} color="black" />
                  </View>
                  <View className="flex items-center py-2 space-y-1">
                    <Text style={styles.textFontInner}>35</Text>
                    <Text style={styles.textFontInner}>Mins</Text>
                  </View>
                </View>
                <View style={styles.elementInner}>
                  <View style={styles.iconInner}>
                    <Ionicons name="ios-people-sharp" size={35} color="black" />
                  </View>
                  <View className="flex items-center py-2 space-y-1">
                    <Text style={styles.textFontInner}>35</Text>
                    <Text style={styles.textFontInner}>Mins</Text>
                  </View>
                </View>
                <View style={styles.elementInner}>
                  <View style={styles.iconInner}>
                    <MaterialIcons
                      name="local-fire-department"
                      size={35}
                      color="black"
                    />
                  </View>
                  <View className="flex items-center py-2 space-y-1">
                    <Text style={styles.textFontInner}>35</Text>
                    <Text style={styles.textFontInner}>Mins</Text>
                  </View>
                </View>
                <View style={styles.elementInner}>
                  <View style={styles.iconInner}>
                    <Octicons name="stack" size={35} color="black" />
                  </View>
                  <View className="flex items-center py-2 space-y-1">
                    <Text style={styles.textFontInner}>35</Text>
                    <Text style={styles.textFontInner}>Mins</Text>
                  </View>
                </View>
              </View>
            </View>



            {/* Ingredient */}
            <View>
              <View style={{ marginBottom: hp(4) }}>
                <Text style={styles.ingredientsTitle}>Ingredients</Text>
                <View style={styles.ingredientsList}>
                  {ingredientsIndexes(meal).map((i) => (
                    <View key={i} style={styles.ingredientItem}>
                      <View style={styles.bulletPoint} />
                      <View style={styles.ingredientTextContainer}>
                        <Text style={styles.measureText}>
                          {meal["strMeasure" + i]}
                        </Text>
                        <Text style={styles.ingredientText}>
                          {meal["strIngredient" + i]}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              {/* instructions */}
              <View style={styles.instructionsContainer}>
                <Text style={styles.instructionsTitle}>Instructions</Text>
                <Text style={styles.instructionsText}>
                  {meal?.strInstructions}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 30,
  },
  body: {
    flexDirection: "row",
    justifyContent: "center",
  },
  images: {
    width: wp(98),
    height: hp(50),
    borderRadius: 53,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 59,
    marginLeft: 15,
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonBack: {
    flexDirection: "row",
    alignItems: "center",
  },
  textFont: {
    fontSize: 16,
    color: "#4b4b4b",
    textDecorationLine: "underline",
    marginLeft: 8,
  },
  buttonLove: {
    alignItems: "flex-end",
    marginRight: 30,
  },
  loadingAnima: {
    flex: 1,
    width: 400,
    height: 400,
    justifyContent: "center",
    alignContent: "center",
  },
  containerBody: {
    marginTop: 20,

    padding: 5,
  },
  textTitle: {
    fontSize: 27,
    fontWeight: "bold",
  },
  textExplain: {
    fontSize: 20,
  },
  innerArea: {
    marginTop: 15,
  },
  containerInner: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  elementInner: {
    backgroundColor: "#FFC107",
    padding: hp(3),
    borderRadius: 55,
  },
  iconInner: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  textFontInner: {
    fontSize: hp(2.1),
    alignItems: "center",
    justifyContent: "center",
  },

  ingredientsTitle: {
    fontSize: hp(2.8),
    marginLeft: 10,
    fontWeight: "bold",
    color: "#4b4b4b",
  },
  ingredientsList: {
    marginLeft: hp(3),
    marginTop: hp(2),
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(2),
  },
  bulletPoint: {
    height: hp(1),
    width: hp(1),
    backgroundColor: "#FFC107",
    borderRadius: hp(0.75),
  },
  ingredientTextContainer: {
    flexDirection: "row",
    marginLeft: hp(2),
  },
  measureText: {
    fontSize: hp(2.1),
    color: "#5e5a5a",
  },
  ingredientText: {
    fontSize: hp(2.3),
    fontWeight: "bold",
    color: "#565656",
    marginLeft: hp(1),
  },
  instructionsContainer: {
    marginBottom: hp(4),
    marginLeft: 10,
  },
  instructionsTitle: {
    fontSize: hp(2.8),
    fontWeight: "bold",
    color: "#4b4b4b",
  },
  instructionsText: {
    fontSize: hp(2.2),
    marginTop:7,
    color: "#000000",
  },
});
