import MasonryList from "@react-native-seoul/masonry-list";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function Recipes({ categories, meals, mealType, dateMeal }) {
  const navigation = useNavigation();
  return (
    <View style={{ marginHorizontal: 16, marginTop: 12 }}>
      <Text style={{ fontSize: hp(3), fontWeight: "600", color: "#007058" }}>
        Recipes
      </Text>
      <View>
        {categories.length === 0 || meals.length === 0 ? (
          <View>
            <LottieView
              style={styles.image}
              source={require("../../assets/animation/LoadingIcon.json")}
              autoPlay
              loop
            />
          </View>
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <RecipeCard
                item={item}
                index={index}
                navigation={navigation}
                mealType={mealType}
                dateMeal={dateMeal}
              />
            )}
            // refreshing={isLoadingNext}
            // onRefresh={() => refetch({ first: ITEM_CNT })}
            onEndReachedThreshold={0.1}
            // onEndReached={() => loadNext(ITEM_CNT)}
          />
        )}
      </View>
    </View>
  );
}

const RecipeCard = ({ item, index, navigation, mealType, dateMeal }) => {
  let isEven = index % 2 === 0;

  return (
    <Animated.View>
      <Pressable
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
          justifyContent: "center",
          marginBottom: 8,
        }}
        onPress={() =>
          navigation.navigate("RecipeDetail", { ...item, mealType, dateMeal })
        }
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 === 0 ? hp(25) : hp(35),
            borderRadius: 10,
          }}
        />

        <Text
          style={{
            fontSize: hp(1.5),
            fontWeight: "600",
            marginLeft: 8,
            color: "gray",
          }}
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 400,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
