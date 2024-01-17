import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Categories from "../components/Category/category";
import Recipes from "../components/Category/recipes";

export default function MealScreen({ route }) {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const { mealType } = route.params;
  const { dateMeal } = route.params;
  
  console.log('mealScreen',dateMeal)

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);


  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        style={{ paddingTop: hp(8) }}
      >
        {/* avatar and bell icon */}

        {/* greetings and punchline */}
        <View style={{ marginHorizontal: 4, marginBottom: 2 }}>
          <View>
            <Text
              style={{
                fontSize: hp(3.8),
                fontWeight: "600",
                color: "#FD8061", // Primary color
              }}
            >
              Make your own food,
            </Text>
          </View>
          <Text
            style={{
              fontSize: hp(3.8),
              fontWeight: "600",
              color: "#FD8061", // Primary color
            }}
          >
            stay at <Text style={{ color: "#007058" }}>home</Text>
          </Text>
        </View>

        {/* search bar */}
        <View
          style={{
            marginHorizontal: 4,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: hp(1),
            backgroundColor: "rgba(0,0,0,0.1)",
            padding: hp(1),
          }}
        >
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={{
              flex: 1,
              fontSize: hp(1.7),
              marginBottom: hp(1),
              paddingLeft: hp(1.5),
              color: "#333", // Text color
            }}
          />
          <View
            style={{
              backgroundColor: "#FFF", // Secondary color
              borderRadius: hp(1.5),
              padding: hp(1),
            }}
          ></View>
        </View>

        {/* categories */}
        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        {/* recipes */}
        <View>
          <Recipes meals={meals} categories={categories} mealType={mealType} dateMeal= {dateMeal} />
        </View>
      </ScrollView>
    </View>
  );
}
