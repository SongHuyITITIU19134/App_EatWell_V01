import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { addIntoSurveyRecipes } from "../../ulti/httpRequest/httpResearchFood";

const RecipeDetailScreen = ({ route, navigation }) => {
  const { recipe } = route.params;

  const handleAddRecipe = async () => {
    if (recipe) {
      const recipeToAdd = {
        nameRecipe: recipe.label,
        imageRecipeUrl: recipe.image,
        dietLabelsRecipe: recipe.dietLabels,
      };
      addIntoSurveyRecipes(recipeToAdd);
      alert("Successfully added");
      navigation.goBack();
    } else {
      alert("Not found");
    }
  };
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.goBackButton}
      >
        <Text style={styles.goBackButtonText}>Go Back</Text>
      </TouchableOpacity>

      <Image require={{ uri: recipe.image }} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{recipe.label}</Text>
      <Text style={styles.recipeInfo}>
        Calories: {recipe.calories.toFixed(2)}
      </Text>
      <Text style={styles.recipeInfo}>Servings: {recipe.yield}</Text>
      <Text style={styles.ingredientsTitle}>Ingredients:</Text>
      <View style={styles.ingredientsContainer}>
        {recipe.ingredientLines.map((ingredient, index) => (
          <Text key={index} style={styles.ingredientItem}>
            {index + 1}. {ingredient}
          </Text>
        ))}
      </View>
      <Text style={styles.recipeInfo}>
        Total Time: {recipe.totalTime} minutes
      </Text>

      {/* Add more details as needed */}

      <TouchableOpacity
        onPress={() => handleAddRecipe(recipe)}
        style={styles.addToMealButton}
      >
        <Text style={styles.addToMealButtonText}>Add to Meal</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: "#FAF8F1",
  },
  goBackButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#748E63",
    padding: 10,
    borderRadius: 5,
  },
  goBackButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  recipeImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#748E63",
    marginBottom: 10,
    textAlign: "center",
  },
  recipeInfo: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 10,
  },
  ingredientsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#748E63",
    marginBottom: 10,
  },
  ingredientsContainer: {
    marginLeft: 20,
  },
  ingredientItem: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 5,
  },
  addToMealButton: {
    marginTop: 20,
    backgroundColor: "#C58940",
    padding: 20,
    borderRadius: 5,
  },
  addToMealButtonText: {
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default RecipeDetailScreen;
