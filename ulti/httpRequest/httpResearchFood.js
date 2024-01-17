import axios from "axios";

const appId = "40ffc387";
const appKey = "a5e7f2171cf4715a6ea3238f24fb100c";

export const fetchRecipesFromEdamam = async (selectedOptions) => {
  try {
    const apiUrl = `https://api.edamam.com/search?q=${selectedOptions.join(
      "+"
    )}&app_id=${appId}&app_key=${appKey}`;

    const response = await axios.get(apiUrl);

    return response.data.hits.map((hit) => hit.recipe);
  } catch (error) {
    console.error("Error fetching recipes from Edamam:", error.message);
    return null;
  }
};

export const fetchDetailRecipeEdamam = async (recipeUri) => {
  try {
    const apiRecipesUrl = `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${encodeURIComponent(
      recipeUri
    )}&app_id=${appId}&app_key=${appKey}`;
    const response = await axios.get(apiRecipesUrl);
    console.log(response);
    return response.data.hits.map((hit) => hit.recipe);
  } catch (error) {
    console.error(
      "Error fetching detail of recipes from Edamam:",
      error.message
    );
    return null;
  }
};

const BACKEND_URL =
  "https://meal-plan-app-3331d-default-rtdb.asia-southeast1.firebasedatabase.app/userRecipes.json";
const api_URL =
  "https://meal-plan-app-3331d-default-rtdb.asia-southeast1.firebasedatabase.app";
export const addIntoSurveyRecipes = async (recipesData) => {
  try {
    const response = await axios.post(BACKEND_URL, recipesData);

    console.log("Recipes added successfully:", response.data);
  } catch (error) {
    console.error("Error adding meal:", error.message);
  }
};
export const fetchRecipesUser = async () => {
  try {
    const response = await axios.get(BACKEND_URL);
    const recipesUser = [];
    for (const key in response.data) {
      const recipesUserObject = {
        id: key,
        nameRecipe: response.data[key].nameRecipe,
        imageRecipe: response.data[key].imageRecipeUrl,
        typeofRecipe: response.data[key].dietLabelsRecipe,
        ingredientRecipe: response.data[key].ingredientRecipe,
        timeRecipe: response.data[key].timeRecipe,
        dateRecipe: response.data[key].typeofRecipe,
        yieldRecipe: response.data[key].yieldRecipe,
      };
      recipesUser.push(recipesUserObject);
    }
    return recipesUser;
  } catch (error) {
    console.error("Error fetching meal user data:", error.message);
    return [];
  }
};

export function deleteRecipeUser(id) {
  return axios.delete(api_URL + `/userRecipes/${id}.json`);
}
export const deleteAllData = async () => {
  try {
    const response = await axios.delete(BACKEND_URL);
    // Handle the response if needed
    console.log("Delete all data response:", response.data);
  } catch (error) {
    console.error("Error deleting all data:", error.message);
    throw error;
  }
};
