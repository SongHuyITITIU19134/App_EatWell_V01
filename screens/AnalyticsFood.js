import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { activeAnalyticsFood } from "../ulti/httpRequest/apiNutritionAna";
import RenderAnalyticsData from "./RenderAnalyticsData";

const SearchBarWithSuggestions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);
  const [data, setData] = useState("");
  const [isClick, setClick] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const refreshPage = () => {
    setRefresh(true);
    setClick(false);
    setData("");
    setSelectedIngredient("");
    setIngredientQuantity("");
    setIngredientsList("");
    setIngredientUnit("");
    setSearchQuery("");

    setTimeout(() => {
      setRefresh(false);
    }, 3000);
  };

  console.log("dataa", data);
  const handleSearch = (query) => {
    const dummySuggestions = [
      "Apple",
      "Banana",
      "Orange",
      "Mango",
      "Carrot",
      "Broccoli",
      "Spinach",
      "Tomato",
      "Chicken",
      "Beef",
      "Salmon",
      "Rice",
      "Quinoa",
      "Lettuce",
      "Cucumber",
      "Avocado",
      "Egg",
      "Garlic",
      "Onion",
      "Bell Pepper",
      "Parmesan Cheese",
      "Mushroom",
      "Olive Oil",
      "Soy Sauce",
      "Honey",
      "Lemon",
      "Cilantro",
      "Parsley",
      "Basil",
      "Thyme",
      "Oregano",
      "Rosemary",
      "Ginger",
      "Turmeric",
      "Cinnamon",
      "Nutmeg",
      "Vanilla Extract",
      "Almond",
      "Peanut Butter",
      "Greek Yogurt",
      "Milk",
      "Flour",
      "Sugar",
      "Salt",
      "Pepper",
    ];

    const filteredSuggestions = dummySuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
    setSearchQuery(query);
  };

  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleSuggestionPress(item)}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const handleSuggestionPress = (selectedSuggestion) => {
    setSelectedIngredient(selectedSuggestion);
    setSearchQuery(selectedSuggestion);
    setSuggestions([]);
  };
  const handleEditIngredient = (index) => {
    const editedIngredient = ingredientsList[index];
    setIngredientQuantity(editedIngredient.quantity);
    setIngredientUnit(editedIngredient.unit);
    setSelectedIngredient(editedIngredient.name);

    // Remove the edited ingredient from the list
    const updatedList = [...ingredientsList];
    updatedList.splice(index, 1);
    setIngredientsList(updatedList);
  };

  const handleDeleteIngredient = (index) => {
    const updatedList = [...ingredientsList];
    updatedList.splice(index, 1);
    setIngredientsList(updatedList);
  };

  const handleAddIngredient = () => {
    const newIngredient = {
      name: selectedIngredient,
      quantity: ingredientQuantity,
      unit: ingredientUnit,
    };

    console.log("Adding Ingredient:", newIngredient);

    setIngredientsList([...ingredientsList, newIngredient]);
    setIngredientQuantity("");
    setIngredientUnit("");
    setSelectedIngredient(null);
  };
  const handleAnalyticsFood = async () => {
    setClick(true);
    const allIngredientsString = ingredientsList
      .map(
        (ingredient) =>
          `${ingredient.name} ${ingredient.quantity} ${ingredient.unit}`
      )
      .join(", ");

    console.log("All Ingredients:", allIngredientsString);

    const data = await activeAnalyticsFood(allIngredientsString);
    setData(data);
    return allIngredientsString;
  };

  const renderIngredientItem = ({ item, index }) => (
    <View style={styles.ingredientItem}>
      <Text style={styles.columnText}>{item.name}</Text>
      <Text style={styles.columnText}>{item.quantity}</Text>
      <Text style={styles.columnText}>{item.unit}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => handleEditIngredient(index)}
      >
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteIngredient(index)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => refreshPage()}
          />
        }
      >
        <View style={styles.container}>
          <Text style={styles.title}>Nutrition Analytics</Text>

          <View style={styles.searchContainer}>
            <TextInput
              style={[
                styles.searchInput,
                searchQuery.length > 0 && styles.searchInputActive,
              ]}
              placeholder="Search"
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>

          {searchQuery.length > 0 && (
            <FlatList
              style={styles.suggestionsContainer}
              data={suggestions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderSuggestionItem}
            />
          )}

          {selectedIngredient && (
            <View style={styles.ingredientContainer}>
              <Text style={styles.selectedIngredientText}>
                Selected Ingredient: {selectedIngredient}
              </Text>
              <View style={styles.ingredientRow}>
                <TextInput
                  style={styles.ingredientInput}
                  placeholder="Enter quantity"
                  value={ingredientQuantity}
                  onChangeText={(text) => setIngredientQuantity(text)}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.ingredientInput}
                  placeholder="Enter unit"
                  value={ingredientUnit}
                  onChangeText={(text) => setIngredientUnit(text)}
                />
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddIngredient}
              >
                <Text>Add Ingredient</Text>
              </TouchableOpacity>
            </View>
          )}

          {ingredientsList.length > 0 && (
            <FlatList
              style={styles.ingredientsListContainer}
              data={ingredientsList}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={() => (
                <View style={styles.tableHeader}>
                  <Text style={styles.columnHeaderText}>Name</Text>
                  <Text style={styles.columnHeaderText}>Quantity</Text>
                  <Text style={styles.columnHeaderText}>Unit</Text>
                  <Text style={styles.columnHeaderText}>Edit Ingredient</Text>
                  <Text style={styles.columnHeaderText}>Delete</Text>
                </View>
              )}
              renderItem={renderIngredientItem}
            />
          )}
          <View>
            {isClick ? (
              <></>
            ) : (
              <View style={styles.buttonAnalytic}>
                <TouchableOpacity
                  style={styles.analyticButton}
                  onPress={handleAnalyticsFood}
                >
                  <Text style={styles.buttonText}>Analytics Food</Text>
                </TouchableOpacity>
              </View>
            )}

            {data ? (
              <View style={styles.containerNutritionData}>
                <RenderAnalyticsData data={data} />
              </View>
            ) : (
              <></>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    fontSize: 16,
  },
  searchInputActive: {
    borderColor: "#4CAF50", // Change the border color when active
  },
  suggestionsContainer: {
    marginTop: 8,
    maxHeight: 30,
  },
  suggestionItem: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  ingredientContainer: {
    marginTop: 20,
  },
  selectedIngredientText: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  ingredientInput: {
    height: 40,
    marginLeft: 10,
    width: 100,
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    fontSize: 16,
    marginTop: 8,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  ingredientsListContainer: {
    marginTop: 20,
  },
  ingredientRow: {
    flexDirection: "row",
  },
  ingredientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#4CAF50",
    padding: 10,
  },
  containerNutritionData: {
    height: 380,
  },
  columnHeaderText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  columnText: {
    fontSize: 16,
    width: 77,
  },
  editButton: {
    backgroundColor: "#2196F3", // Edit button color
    padding: 5,
    marginRight: 5,
  },
  editButtonText: {
    color: "white",
  },
  deleteButton: {
    backgroundColor: "#F44336", // Delete button color
    padding: 5,
  },
  deleteButtonText: {
    color: "white",
  },
  buttonAnalytic: {
    marginTop: 20,
    alignItems: "center",
  },
  analyticButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SearchBarWithSuggestions;
