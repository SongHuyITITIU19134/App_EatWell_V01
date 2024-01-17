import axios from "axios";

const appId = "4db70c28";
const appKey = "7b4d397b214310ebb1c17ac6815a3642";

export const activeAnalyticsFood = async (foodData) => {
  try {
    const apiUrl = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&nutrition-type=cooking&ingr=${encodeURIComponent(foodData)}`;

    console.log('api', foodData);
    const response = await axios.get(apiUrl);
    console.log('api',response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching nutrition details from Edamam:",
      error.message
    );
    return null;
  }
};
