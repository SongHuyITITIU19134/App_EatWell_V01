import { AntDesign, Feather } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { deleteFavRecipes, fetchFavRecipes } from "../../ulti/httpRequest/http";

export default function FavouriteScreen() {
  const [selectedItem, setSelectedItem] = useState("Recipes");
  const [searchQuery, setSearchQuery] = useState("");
  const [pressed, setPress] = useState(false);
  const [expandedRecipes, setExpandedRecipes] = useState([]);
  const [dataFav, setFetchedFavRecipes] = useState([]);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    renderFavRecipe();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      renderFavRecipe();
    }, [])
  );

  const renderFavRecipe = async () => {
    try {
      const favDataRecipe = await fetchFavRecipes();
      setFetchedFavRecipes(favDataRecipe);
    } catch (error) {
      console.error("Error fetching recipe data:", error.message);
    }
  };
  const handleClick = () => {
    console.log("nothing");
  };
  const toggleRecipeExpansion = (recipe) => {
    console.log("press", recipe);
    navigation.navigate("RecipeDetail", {
      idMeal: recipe.idFavRecipes,
      strMealThumb: recipe.imageFavRecipes,
      mealType: recipe.favRecipesType,
    });
  };

  const renderRecipeFavContainer = (recipe, index) => {
    const handleDeleteRecipe = async (id) => {
      try {
        Alert.alert(
          "Confirmation",
          "Are you sure you want to delete this recipe?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Delete",
              style: "destructive",
              onPress: async () => {
                await deleteFavRecipes(id);
                console.log("Recipe deleted successfully");
                const updatedRecipeData = await fetchFavRecipes();
                setFetchedFavRecipes(updatedRecipeData);
              },
            },
          ]
        );
      } catch (error) {
        console.error("Error deleting recipe:", error.message);
      }
    };
    return (
      <View key={index}>
        <TouchableOpacity
          key={index}
          style={styles.recipeContainer}
          onPress={handleClick}
        >
          <Image
            source={{ uri: recipe.imageFavRecipes }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 10,
              marginBottom: 10,
            }}
          />
          <View style={styles.overlayRecipe}>
            <TouchableOpacity
              onPress={() => handleDeleteRecipe(recipe.id)}
              style={styles.buttonDeleteRecipes}
            >
              <Feather name="x-circle" size={35} color="black" />
            </TouchableOpacity>
          </View>

          <Text style={styles.recipeTitle}>{recipe.nameFavRecipes}</Text>

          <TouchableOpacity
            onPress={() => toggleRecipeExpansion(recipe)}
            style={{ marginTop: 10 }}
          >
            <Text style={{ color: COLORS.primary, fontSize: 18 }}>
              {expandedRecipes[index] ? "" : "See more"}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };

  console.log(dataFav);

  const handlePressRecipe = () => {
    setPress(true);
  };

  const handlePressMeal = () => {
    setPress(false);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Favourites</Text>
        </View>
        <FlatList
          data={["Your Recipes", "Your Articles"]}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.switchButton,
                pressed
                  ? item === "Your Recipes"
                    ? styles.activeSwitch
                    : {}
                  : !pressed && item === "Your Articles"
                  ? styles.activeSwitch
                  : {},
              ]}
              onPress={
                item === "Your Recipes" ? handlePressRecipe : handlePressMeal
              }
            >
              <Text style={styles.switchButtonText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        {pressed ? (
          <View>
            {dataFav.map((recipe, index) => (
              <View key={index}>{renderRecipeFavContainer(recipe, index)}</View>
            ))}
          </View>
        ) : (
          <></>
        )}
      </ScrollView>
    </View>
  );
}
const COLORS = {
  primary: "#748E63",
  accent: "#C58940",
  secondary: "#8ACDD7",
  background: "#FAF8F1",
  black: "#000000",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  body: {
    flexDirection: "row",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  scroll: {
    height: 10,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchInput: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  switchItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
  },
  selectedItem: {
    backgroundColor: "#4CAF50",
  },
  switchText: {
    fontSize: 18,
  },
  countText: {
    fontSize: 16,
    color: "#555",
  },
  item: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  itemText: {
    fontSize: 18,
  },
  switchButton: {
    marginVertical: 10,
    height: 50,
    marginRight: 30,
    width: 190,
  },
  switchButtonText: {
    fontSize: 18,
    color: "black",
  },
  activeSwitch: {
    borderBottomWidth: 2,
    borderColor: "#008ffc",
  },
  overlayRecipe: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    borderRadius: 10,
  },
  buttonDeleteRecipes: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  recipeContainer: {
    borderWidth: 2,
    borderColor: "#bc9c1d",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
});
