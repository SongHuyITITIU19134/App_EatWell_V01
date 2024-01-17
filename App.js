import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { Text } from "react-native";
import { Colors } from "./constants/styles";
import AnalyticsFood from "./screens/AnalyticsFood";
import ArticleCreateScreen from "./screens/ArticleCreateScreen";
import ArticleScreen from "./screens/ArticleScreen";
import DetailArticleScreen from "./screens/DetailArticleScreen";
import DetailScreen from "./screens/DetailScreen";
import FavouriteScreen from "./screens/FavoScreen/FavouriteScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import MealScreen from "./screens/MealScreen";
import OnBoardingScreen from "./screens/OnBoardingScreen";
import RecipeDetailScreen from "./screens/RecipesScreenAPI/RecipeDetailScreen";
import PersonDetail from "./screens/Setting Screen/PersonDetail";
import SettingScreen from "./screens/SettingScreen";
import SignupScreen from "./screens/SignupScreen";
import SurveyScreen from "./screens/SurveyScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import HoldingScreen from "./screens/WelcomeScreen/HoldingScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { UserProvider } from "./store/userData-context";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerTintColor: "black",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={OnBoardingScreen}
        options={{ title: "Welcome to Meal Plan App" }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: "Signup" }} // Customize the header for this screen
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      initialRouteName="HoldingScreen"
      screenOptions={{
        headerTintColor: Colors.primary500,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="HoldingScreen"
        component={HoldingScreen}
        options={{ title: "HoldingScreen" }}
      />
      <Stack.Screen
        name="SurveyScreen"
        component={SurveyScreen}
        options={{ title: "Survey" }}
      />
      <Stack.Screen
        name="RecipeDetailAPI"
        component={RecipeDetailScreen}
        options={{ title: "RecipeDetailAPI" }}
      />

      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ title: "Welcome" }}
      />
      <Stack.Screen
        name="DetailArticleScreen"
        component={DetailArticleScreen}
        options={{ title: "Detail Article Screen" }}
      />
      <Stack.Screen
        name="CreateArticleScreen"
        component={ArticleCreateScreen}
        options={{ title: "CreateArticleScreen" }}
      />
      <Stack.Screen
        name="FavoriteScreen"
        component={FavouriteScreen}
        options={{ title: "Favou" }}
      />

      <Stack.Screen name="Home" component={NavBarBottom} />
      <Stack.Screen name="RecipeDetail" component={DetailScreen} />
      <Stack.Screen name="PersonDetail" component={PersonDetail} />
      <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
    </Stack.Navigator>
  );
}
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "black",
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}
function NavBarBottom() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="ios-home-outline"
              size={30}
              color={focused ? "blue" : "black"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 14 : 12,
                color: focused ? "blue" : "black",
                marginTop: 2,
              }}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Meal"
        component={MealScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="food-takeout-box-outline"
              size={30}
              color={focused ? "blue" : "black"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 14 : 12,
                color: focused ? "blue" : "black",
                marginTop: 2,
              }}
            >
              Meals
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Nutrition"
        component={AnalyticsFood}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name="calculator"
              size={30}
              color={focused ? "blue" : "black"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 14 : 12,
                color: focused ? "blue" : "black",
                marginTop: 2,
              }}
            >
              Nutrition
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Article"
        component={ArticleScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="post-outline"
              size={30}
              color={focused ? "blue" : "black"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 14 : 12,
                color: focused ? "blue" : "black",
                marginTop: 2,
              }}
            >
              Articles
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="settings-outline"
              size={30}
              color={focused ? "blue" : "black"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 14 : 12,
                color: focused ? "blue" : "black",
                marginTop: 2,
              }}
            >
              Setting
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated ? <AuthStack /> : <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <UserProvider>
          <Navigation />
        </UserProvider>
      </AuthContextProvider>
    </>
  );
}
