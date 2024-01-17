import axios from "axios";

const apiUrl =
  "https://meal-plan-app-3331d-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json";

const backEndURL =
  "https://meal-plan-app-3331d-default-rtdb.asia-southeast1.firebasedatabase.app";

export const addMealUser = async (mealUserData) => {
  try {
    const response = await axios.post(apiUrl, mealUserData);

    console.log("Meal added successfully:", response.data);
  } catch (error) {
    console.error("Error adding meal:", error.message);
  }
};

export const fetchMealUser = async () => {
  try {
    const response = await axios.get(apiUrl);
    const mealUserData = [];

    for (const key in response.data) {
      const mealUserDataObject = {
        id: key,
        idMeal: response.data[key].idMeal,
        nameMeal: response.data[key].nameMeal,
        imageMeal: response.data[key].imageMealUrl,
        mealType: response.data[key].mealType,
        dateMeal: response.data[key].dateMeal,
      };
      mealUserData.push(mealUserDataObject);
    }

    console.log(mealUserData);

    return mealUserData;
  } catch (error) {
    console.error("Error fetching meal user data:", error.message);
    return [];
  }
};

export function deleteMealUser(id) {
  return axios.delete(backEndURL + `/meals/${id}.json`);
}

export const addArticleUser = async (dataArticle) => {
  try {
    const response = await axios.post(
      backEndURL + `/articles.json`,
      dataArticle
    );
    console.log("Article added successfully:", response.data);
  } catch (error) {
    console.error("Error adding Article:", error.message);
  }
};

export const fetchArticleUser = async () => {
  try {
    const response = await axios.get(backEndURL + `/articles.json`);
    const articleMeal = [];

    for (const key in response.data) {
      const articleMealObject = {
        id: key,
        tagsArticles: response.data[key].tags,
        introArticles: response.data[key].intro,
        instructionArticles: response.data[key].instructions,
        ingredientsArticle: response.data[key].ingredients,
        imageArticle: response.data[key].image,
      };
      articleMeal.push(articleMealObject);
    }

    console.log(articleMeal);

    return articleMeal;
  } catch (error) {
    console.error("Error fetching Article user data:", error.message);
    return [];
  }
};

export function deleteArticleUser(id) {
  return axios.delete(backEndURL + `/articles/${id}.json`);
}

export const addFavoriteRecipe = async (favRecipes) => {
  try {
    const response = await axios.post(
      backEndURL + `/favrecipes.json`,
      favRecipes
    );
    console.log("Your Favorite Recipes added successfully:", response.data);
  } catch (error) {
    console.error("Error adding Favorite Recipes:", error.message);
  }
};

export const fetchFavRecipes = async () => {
  try {
    const response = await axios.get(backEndURL + `/favrecipes.json`);
    const favRecipes = [];
    for (const key in response.data) {
      const favRecipesDataObject = {
        id: key,
        nameFavRecipes: response.data[key].nameMeal,
        idFavRecipes: response.data[key].idMeal,
        imageFavRecipes: response.data[key].imageMealUrl,
        favRecipesType: response.data[key].mealType,
      };
      favRecipes.push(favRecipesDataObject);
    }
    return favRecipes;
  } catch (error) {
    console.error("Error fetching meal user data:", error.message);
    return [];
  }
};

export function deleteFavRecipes(id) {
  return axios.delete(backEndURL + `/favrecipes/${id}.json`);
}


export const addFavoriteArticle = async (favArticles) => {
  try {
    const response = await axios.post(
      backEndURL + `/favArticles.json`,
      favArticles
    );
    console.log("Your Favorite Articles added successfully:", response.data);
  } catch (error) {
    console.error("Error adding Favorite Articles:", error.message);
  }
};

export const fetchFavArticle = async () => {
  try {
    const response = await axios.get(backEndURL + `/favArticles.json`);
    const favRecipes = [];
    for (const key in response.data) {
      const favRecipesDataObject = {
        id: key,
        nameFavRecipes: response.data[key].nameMeal,
        idFavRecipes: response.data[key].idMeal,
        imageFavRecipes: response.data[key].imageMealUrl,
        favRecipesType: response.data[key].mealType,
      };
      favRecipes.push(favRecipesDataObject);
    }
    return favRecipes;
  } catch (error) {
    console.error("Error fetching meal user data:", error.message);
    return [];
  }
};
// export function deleteFavRecipes(id) {
//   return axios.delete(backEndURL + `/favrecipes/${id}.json`);
// }