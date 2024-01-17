import { Feather, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import React, { useLayoutEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import WeekView from "../components/WeekViewDisplay/WeekView";
import Button from "../components/ui/Button";
import { deleteMealUser, fetchMealUser } from "../ulti/httpRequest/http";
import {
  deleteRecipeUser,
  fetchRecipesUser,
} from "../ulti/httpRequest/httpResearchFood";

const todayDate = new Date().toISOString().split("T")[0];

export default function HomeScreen() {
  const [meals, setMeals] = useState([]);
  const navigation = useNavigation();
  const [pressed, setPress] = useState(false);
  const [activeButtonAdd, setActiveButton] = useState(true);
  const [fetchRecipes, setFetchedRecipes] = useState([]);
  const [expandedRecipes, setExpandedRecipes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date(todayDate));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const calendar = new Date();
  calendar.setDate(new Date(selectedDate).getDate() + 0);
  const calendarNumber = calendar.getDate();
  console.log(calendarNumber);

  useLayoutEffect(() => {
    fetchData();
    renderRecipe();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      renderRecipe();
    }, [])
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleOpenFavorites = () => {
    navigation.navigate("FavoriteScreen");
    toggleModal();
  };

  const handleOpenSide = () => {
    toggleModal();
  };

  const handlePressRecipe = () => {
    setPress(true);
    setActiveButton(true);
  };

  const handlePressMeal = () => {
    setPress(false);
    setActiveButton(true);
  };

  const fetchData = async () => {
    try {
      const mealData = await fetchMealUser();
      setMeals(mealData);
      setActiveButton(true);
    } catch (error) {
      console.error("Error fetching meal data:", error.message);
    }
  };

  const renderRecipe = async () => {
    try {
      const fetchedRecipes = await fetchRecipesUser();
      setFetchedRecipes(fetchedRecipes);
    } catch (error) {
      console.error("Error fetching recipe data:", error.message);
    }
  };

  const handleBreakFastAdd = () => {
    setActiveButton(false);
    const date = new Date();
    date.setDate(new Date(selectedDate).getDate() + 0);
    const dateNumber = date.getDate();

    navigation.navigate("Meal", {
      mealType: "BreakFast",
      dateMeal: dateNumber.toString(),
    });
  };

  const handleLunchAdd = () => {
    setActiveButton(false);
    const date = new Date();
    date.setDate(new Date(selectedDate).getDate() + 0);
    const dateNumber = date.getDate();
    navigation.navigate("Meal", {
      mealType: "Lunch",
      dateMeal: dateNumber.toString(),
    });
  };

  const handleDinnerAdd = () => {
    setActiveButton(false);
    const date = new Date();
    date.setDate(new Date(selectedDate).getDate() + 0);
    const dateNumber = date.getDate();
    navigation.navigate("Meal", {
      mealType: "Dinner",
      dateMeal: dateNumber.toString(),
    });
  };

  const handleMealDetail = (meal) => {
    navigation.navigate("RecipeDetail", {
      idMeal: meal.idMeal,
      strMealThumb: meal.imageMeal,
      mealType: meal.mealType,
    });
  };

  async function deleteHandler(mealData) {
    try {
      // Display a confirmation alert
      Alert.alert(
        "Confirmation",
        "Are you sure you want to delete this meal?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              await deleteMealUser(mealData.id);
              console.log("Meal deleted successfully");
              const updatedMealData = await fetchMealUser();
              setMeals(updatedMealData);
              navigation.navigate("HomeScreen");
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error deleting meal:", error.message);
    }
  }
  const toggleRecipeExpansion = (index) => {
    const updatedExpandedRecipes = [...expandedRecipes];
    updatedExpandedRecipes[index] = !updatedExpandedRecipes[index];
    setExpandedRecipes(updatedExpandedRecipes);
  };

  const renderExpandedInfo = (recipe, index) => {
    if (expandedRecipes[index]) {
      return (
        <View>
          <Text
            style={styles.textFont}
          >{`Total Time: ${recipe.timeRecipe} minutes`}</Text>
          <Text style={styles.textFont}>{`Yield: ${recipe.yieldRecipe}`}</Text>
        
          <View style={styles.ingredientsContainer}>
            {recipe.ingredientRecipe.map((ingredient, index) => (
              <Text key={index} style={styles.textFont}>
                {index + 1}. {ingredient}
              </Text>
            ))}
          </View>
        </View>
      );
    }
    return null;
  };

  const updateSelectedDateInWeekView = (date) => {
    setSelectedDate(date);
  };

  const handleDatePickerChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      updateSelectedDateInWeekView(date);
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const renderRecipeContainer = (recipe, index) => {
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
                await deleteRecipeUser(id);
                console.log("Recipe deleted successfully");
                const updatedRecipeData = await fetchRecipesUser();
                setFetchedRecipes(updatedRecipeData);
              },
            },
          ]
        );
      } catch (error) {
        console.error("Error deleting recipe:", error.message);
      }
    };
    return (
      <View>
        <TouchableOpacity
          key={index}
          onPress={() => toggleRecipeExpansion(index)}
          style={styles.recipeContainer}
        >
          <Image
            source={{ uri: recipe.imageRecipe }}
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

          <Text style={styles.recipeTitle}>{recipe.nameRecipe}</Text>

          <TouchableOpacity
            onPress={() => toggleRecipeExpansion(index)}
            style={{ marginTop: 10 }}
          >
            <Text style={{ color: COLORS.primary }}>
              {expandedRecipes[index] ? "Collapse" : "Expand"}
            </Text>
          </TouchableOpacity>
          {renderExpandedInfo(recipe, index)}
        </TouchableOpacity>
      </View>
    );
  };
  const addSomeMore = () => {
    navigation.navigate("SurveyScreen");
  };
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {/* Avatar and Bell Icon */}
        <View style={styles.header}>
          <View style={styles.profile}>
            <Image
              source={require("../assets/animation/Image/icon-user.png")}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.greeting}>Hello, Noman!</Text>
            </View>
          </View>

          <View style={styles.header}>
            <TouchableOpacity onPress={handleOpenSide}>
              <Ionicons name="menu" size={30} color="black" />
            </TouchableOpacity>
            <Modal
              animationType="fade"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={() => {
                setModalVisible(!isModalVisible);
              }}
            >
              <View style={styles.modalOverlay} />
              <View style={styles.drawerContainer}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(!isModalVisible)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>

                {/* Your menu items */}
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleOpenFavorites()}
                >
                  <Text style={styles.menuItemText}>Favorites</Text>
                </TouchableOpacity>

                {/* Add more menu items as needed */}
              </View>
            </Modal>
          </View>
        </View>

        {/* Calendar and Button Switch */}
        <View style={styles.calendarContainer}>
          <TouchableOpacity style={styles.addButton} onPress={openDatePicker}>
            <Text style={styles.addButtonText}>Select Date</Text>
          </TouchableOpacity>

          <WeekView
            todayDate={todayDate}
            selectedDate={selectedDate}
            updateSelectedDate={updateSelectedDateInWeekView}
          />

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="calendar"
              onChange={(event, date) => {
                handleDatePickerChange(event, date);
              }}
            />
          )}

          <FlatList
            data={["Your Recipes", "Your Meal Plan"]}
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
                    : !pressed && item === "Your Meal Plan"
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
        </View>

        {/* Name of Plan and Kcal */}
        {pressed ? (
          <View>
            {fetchRecipes.map((recipe, index) => (
              <View key={index}>{renderRecipeContainer(recipe, index)}</View>
            ))}
            <TouchableOpacity
              style={styles.deleteAllButton}
              onPress={addSomeMore}
            >
              <Text style={styles.deleteAllButtonText}> Add some more </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.midContainer}>
              <LottieView
                style={styles.midImage}
                source={require("../assets/animation/animation-Meal-Family.json")}
                autoPlay
                loop
              />
            </View>
            <View style={styles.bottomContainer}>
              {/* Breakfast */}
              <View style={styles.mealContainer}>
                <Text style={styles.mealTitle}>Breakfast</Text>

                {activeButtonAdd ? (
                  <>
                    <Button
                      title="Add"
                      style={styles.addMealButton}
                      onPress={handleBreakFastAdd}
                    >
                      <Ionicons name="ios-add" size={20} color="white" />
                      <Text style={styles.addMealButtonText}>Add Meal</Text>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button title="Edit" style={styles.addMealButton}>
                      <Ionicons name="ios-add" size={20} color="white" />
                      <Text style={styles.addMealButtonText}>Edit Meal</Text>
                    </Button>
                  </>
                )}
              </View>
              {meals
                .filter((meal) => {
                  return (
                    meal.mealType === "BreakFast" &&
                    meal.dateMeal === calendarNumber.toString()
                  );
                })
                .map((meal) => (
                  <TouchableOpacity
                    key={meal.idMeal}
                    style={styles.containerMeal}
                    onPress={() => handleMealDetail(meal)}
                  >
                    <Image
                      source={{
                        uri: meal.imageMeal,
                      }}
                      style={styles.image}
                    />
                    <View style={styles.overlay}>
                      <Text style={styles.titleMeal}>{meal.nameMeal}</Text>
                      <TouchableOpacity
                        key={meal.idMeal}
                        style={styles.buttonDelete}
                        onPress={() => deleteHandler(meal)}
                      >
                        <Feather name="x-circle" size={32} color="white" />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}

              {/* Lunch */}
              <View style={styles.mealContainer}>
                <Text style={styles.mealTitle}>Lunch</Text>

                {activeButtonAdd ? (
                  <>
                    <Button
                      title="Add"
                      style={styles.addMealButton}
                      onPress={handleLunchAdd}
                    >
                      <Ionicons name="ios-add" size={20} color="white" />
                      <Text style={styles.addMealButtonText}>Add Meal</Text>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button title="Add" style={styles.addMealButton}>
                      <Ionicons name="ios-add" size={20} color="white" />
                      <Text style={styles.addMealButtonText}>Edit Meal</Text>
                    </Button>
                  </>
                )}
              </View>
              {meals
                .filter((meal) => {
                  return (
                    meal.mealType === "Lunch" &&
                    meal.dateMeal === calendarNumber.toString()
                  );
                })
                .map((meal) => (
                  <View key={meal.idMeal} style={styles.containerMeal}>
                    <TouchableOpacity
                      key={meal.idMeal}
                      style={styles.containerMeal}
                      onPress={() => handleMealDetail(meal)}
                    >
                      <Image
                        source={{
                          uri: meal.imageMeal,
                        }}
                        style={styles.image}
                      />

                      <View style={styles.overlay}>
                        <Text style={styles.titleMeal}>{meal.nameMeal}</Text>
                        <TouchableOpacity
                          key={meal.idMeal}
                          style={styles.buttonDelete}
                          onPress={() => deleteHandler(meal)}
                        >
                          <Feather name="x-circle" size={32} color="white" />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}

              {/* Dinner */}
              <View style={styles.mealContainer}>
                <Text style={styles.mealTitle}>Dinner</Text>

                {activeButtonAdd ? (
                  <>
                    <Button
                      title="Add"
                      style={styles.addMealButton}
                      onPress={handleDinnerAdd}
                    >
                      <Ionicons name="ios-add" size={20} color="white" />
                      <Text style={styles.addMealButtonText}>Add Meal</Text>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button title="Add" style={styles.addMealButton}>
                      <Ionicons name="ios-add" size={20} color="white" />
                      <Text style={styles.addMealButtonText}>Edit Meal</Text>
                    </Button>
                  </>
                )}
              </View>
              {meals
                .filter((meal) => {
                  return (
                    meal.mealType === "Dinner" &&
                    meal.dateMeal === calendarNumber.toString()
                  );
                })
                .map((meal) => (
                  <View key={meal.idMeal} style={styles.containerMeal}>
                    <TouchableOpacity
                      key={meal.idMeal}
                      style={styles.containerMeal}
                      onPress={() => handleMealDetail(meal)}
                    >
                      <Image
                        source={{
                          uri: meal.imageMeal,
                        }}
                        style={styles.image}
                      />
                      <View style={styles.overlay}>
                        <Text style={styles.titleMeal}>{meal.nameMeal}</Text>
                        <TouchableOpacity
                          key={meal.idMeal}
                          style={styles.buttonDelete}
                          onPress={() => deleteHandler(meal)}
                        >
                          <Feather name="x-circle" size={32} color="white" />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
            </View>
          </>
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
    backgroundColor: "#fff",
    paddingTop: 70,
  },
  recipeContainer: {
    borderWidth: 2,
    borderColor: "#bc9c1d",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: hp(6),
    height: hp(6),
    borderRadius: hp(3),
    marginRight: 10,
  },
  greeting: {
    fontSize: hp(2.7),
    color: "gray",
  },
  containerMeal: {
    marginTop: 10,
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: 400,
    height: 150,
    borderRadius: 20,
    alignItems: "center",
  },
  midImage: {
    width: "100%",
    height: 200,
  },
  buttonDelete: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  buttonDeleteRecipes: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  overlayRecipe: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(70, 70, 70, 0.5)",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    borderRadius: 10,
    height: 150,
  },
  titleMeal: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  calendarContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  seeMoreText: {
    fontSize: 15,
    color: "#7c7c7c",
  },
  midContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#34B232",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addButtonText: {
    marginLeft: 10,
    color: "white",
  },
  bottomContainer: {
    marginHorizontal: 10,
  },
  mealContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mealTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addMealButton: {
    backgroundColor: "#976868",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
  },
  addMealButtonText: {
    marginLeft: 10,
    color: "white",
  },
  switchButton: {
    marginVertical: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
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
  scrollView: {
    paddingBottom: 50,
    padding: 6,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 8,
  },
  textFont: {
    fontSize: 17,
    fontFamily: "Montserrat",
  },
  deleteAllButton: {
    backgroundColor: "#84ff00",
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  deleteAllButtonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  drawerContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: "#fff",
    zIndex: 100,
    elevation: 5,
  },
  closeButton: {
    marginTop: 70,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  closeButtonText: {
    fontSize: 18,
    color: "blue",
  },
  drawerContent: {
    padding: 10,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Darkened background
    zIndex: 99,
  },

  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  menuItemText: {
    fontSize: 18,
    color: "black",
  },
});
