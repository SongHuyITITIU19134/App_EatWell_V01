import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SurveyData from "../store/dataSurvey/SurveyData";
import {
  addIntoSurveyRecipes,
  fetchRecipesFromEdamam,
} from "../ulti/httpRequest/httpResearchFood";
import OverloadingScreen from "./OverLoadingScreen/OverloadingScreen";

const SurveyScreen = () => {
  const navigation = useNavigation();
  const allQuestions = SurveyData;
  const [progress] = useState(new Animated.Value(0));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isPressed, setIsPressed] = useState(false);
  const [questionsCompleted, setQuestionsCompleted] = useState(false);
  const [fetchedRecipes, setFetchedRecipes] = useState([]);
  const [expandedRecipes, setExpandedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Updated keyword:", keyword);
  }, [keyword]);

  useEffect(() => {
    setShowNextButton(!!currentOptionSelected || !!keyword);
  }, [currentOptionSelected, keyword]);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [currentQuestionIndex, progress]);

  const handleAddRecipe = async (recipe) => {
    if (recipe) {
      const recipeToAdd = {
        nameRecipe: recipe.label,
        imageRecipeUrl: recipe.image,
        dietLabelsRecipe: recipe.dietLabels,
        typeofRecipe: recipe.mealType,
        ingredientRecipe: recipe.ingredientLines,
        yieldRecipe: recipe.yield,
        timeRecipe: recipe.totalTime,
      };

      addIntoSurveyRecipes(recipeToAdd);
      alert("Successfully added");
    } else {
      alert("Not found");
    }
  };

  const toggleRecipeExpansion = (index) => {
    const updatedExpandedRecipes = [...expandedRecipes];
    updatedExpandedRecipes[index] = !updatedExpandedRecipes[index];
    setExpandedRecipes(updatedExpandedRecipes);
  };
  const checkIfRecipeAdded = (recipeLabel) => {
    return selectedOptions.includes(recipeLabel);
  };

  const renderExpandedInfo = (recipe, index) => {
    if (expandedRecipes[index]) {
      return (
        <View>
          <Text>{`Total Time: ${recipe.totalTime} minutes`}</Text>
          <Text>{`Yield: ${recipe.yield}`}</Text>
          <Text>{`Cuisine Type: ${recipe.cuisineType.join(", ")}`}</Text>
          <Text>{`Meal Type: ${recipe.mealType.join(", ")}`}</Text>
          <View style={styles.ingredientsContainer}>
            {recipe.ingredientLines.map((ingredient, index) => (
              <Text key={index} style={styles.ingredientItem}>
                {index + 1}. {ingredient}
              </Text>
            ))}
          </View>
          <View>
            <TouchableOpacity
              onPress={() => handleAddRecipe(recipe)}
              style={styles.addToMealButton}
            >
              <Text style={styles.addToMealButtonText}>Add to Meal</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  };

  const renderRecipeContainer = (recipe, index) => {
    const isRecipeAdded = checkIfRecipeAdded(recipe.label);

    return (
      <View>
        <TouchableOpacity
          key={index}
          onPress={() => toggleRecipeExpansion(index)}
          style={[
            styles.recipeContainer,
            isRecipeAdded && styles.containerAdded,
            isRecipeAdded && { borderColor: "yellow" }, // Apply yellow border for added recipes
          ]}
        >
          <Image
            source={{ uri: recipe.image }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 10,
              marginBottom: 10,
            }}
          />
          <Text style={styles.recipeTitle}>{recipe.label}</Text>
          <Text style={styles.recipeInfo}>
            Calories: {recipe.calories.toFixed(2)}
          </Text>
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

  const handleKeywordChange = (text) => {
    setKeyword(text);
  };


  const handleNextButtonPress = async () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setIsPressed(true);
      setCurrentQuestionIndex(currentQuestionIndex + 1);

    } else {
     
      try {
        setLoading(true);
        const recipes = await fetchRecipesFromEdamam(selectedOptions);

        if (recipes) {
          console.log("Fetched recipes:", recipes);
          setFetchedRecipes(recipes);
          setQuestionsCompleted(true);
        } else {
          console.error("Error fetching recipes.");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    if (isPressed && keyword.trim() !== "") {
      setIsPressed(false);
      setSelectedOptions([...selectedOptions, keyword]);
    }
  };

  const renderProgressBar = () => {
    return (
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progress.interpolate({
                inputRange: [0, allQuestions.length],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
    );
  };

  const renderQuestion = () => {
    return (
      <View style={styles.questionContainer}>
        <View style={styles.questionCounter}>
          <Text style={styles.questionCounterText}>
            {currentQuestionIndex + 1}
          </Text>
          <Text style={styles.questionCounterText}>
            / {allQuestions.length}
          </Text>
        </View>
        <Text style={styles.questionText}>
          {allQuestions[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };

  const renderImage = () => {
    return (
      <View
        style={{
          alignItems: "center",
          width: "100%",
        }}
      >
        <Image
          source={{ uri: allQuestions[currentQuestionIndex]?.imageLink }}
          style={{
            justifyContent: "space-around",
            alignContent: "center",
            width: "90%",
            height: 300,
            borderRadius: 10,
          }}
        />
      </View>
    );
  };

  const renderOptions = () => {
    const currentQuestion = allQuestions[currentQuestionIndex];

    if (currentQuestionIndex === 0) {
      return (
        <TextInput
          style={styles.keywordInput}
          placeholder="Enter keyword"
          value={keyword}
          onChangeText={handleKeywordChange}
        />
      );
    } else {
      return (
        <View>
          {currentQuestion?.options.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => handleOptionPress(option)}
              style={[
                styles.optionContainer,
                {
                  borderColor: selectedOptions.includes(option)
                    ? COLORS.accent
                    : COLORS.secondary + "40",
                  backgroundColor: selectedOptions.includes(option)
                    ? COLORS.accent + "20"
                    : COLORS.secondary + "20",
                },
              ]}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
  };

  const handleOptionPress = (option) => {
    const isOptionSelected = selectedOptions.includes(option);
    const isMultipleSelection = allQuestions[currentQuestionIndex].isMul;

    if (isMultipleSelection) {
      if (isOptionSelected) {
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSkip = () => {
    navigation.navigate("Home");
  };

  const renderContent = () => {
    if (loading) {
      return <OverloadingScreen text="Fetching recipes ..." />;
    } else if (!questionsCompleted) {
      return (
        <>
          {renderProgressBar()}
          {renderQuestion()}
          {renderImage()}
          {renderOptions()}
          {showNextButton && (
            <TouchableOpacity
              onPress={handleNextButtonPress}
              style={styles.nextButton}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          )}
        </>
      );
    } else {
      return (
        <>
          {fetchedRecipes.map((recipe, index) => (
            <View key={index}>{renderRecipeContainer(recipe, index)}</View>
          ))}
        </>
      );
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 50 }}
      style={{ paddingTop: 30 }}
    >
      <StatusBar barStyle="auto" backgroundColor={COLORS.primary} />
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        </View>
        {renderContent()}
      </View>
    </ScrollView>
  );
};

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
  },
  containerAdded: {},
  keywordInputContainer: {
    marginVertical: 10,
  },
  keywordInput: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    backgroundColor: "#ffffff", // Set background color as needed
    marginTop: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10,
    marginBottom: 10,
  },
  skipButton: {
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  skipButtonText: {
    fontSize: 16,
  },
  mainContainer: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
    position: "relative",
  },
  progressBarContainer: {
    width: "100%",
    height: 20,
    borderRadius: 20,
    backgroundColor: "#00000020",
    marginVertical: 7,
  },
  progressBar: {
    height: 20,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
  },
  questionContainer: {
    marginVertical: 40,
  },
  questionCounter: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  questionCounterText: {
    color: COLORS.black,
    fontSize: 20,
    opacity: 0.6,
    marginRight: 2,
  },
  questionText: {
    color: COLORS.black,
    fontSize: 30,
  },
  optionContainer: {
    borderWidth: 3,
    height: 60,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  optionText: {
    fontSize: 20,
    color: COLORS.black,
  },
  nextButton: {
    marginTop: 20,
    width: "100%",
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 5,
  },
  nextButtonText: {
    fontSize: 20,
    color: COLORS.black,
    textAlign: "center",
  },
  recipeContainer: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  containerAdded: {
    borderWidth: 5,
    borderColor: "#31ff03",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.black,
  },
  recipeInfo: {
    fontSize: 16,
    color: COLORS.black,
  },
  addToMealButtonText: {
    fontSize: 15,
    color: "#FFFFFF",
    textAlign: "center",
  },
  addToMealButton: {
    marginTop: 10,
    backgroundColor: "#4b9f1b",
    padding: 10,
    borderRadius: 5,
  },
});

export default SurveyScreen;
