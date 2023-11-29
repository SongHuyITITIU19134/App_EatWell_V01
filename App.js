import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { Colors } from "./constants/styles";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import OnBoardingScreen from "./screens/OnBoardingScreen";
import SignupScreen from "./screens/SignupScreen";
import SurveyScreen from "./screens/SurveyScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={OnBoardingScreen}
        options={{ title: "Onboarding" }} // Customize the header for this screen
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }} // Customize the header for this screen
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
      initialRouteName="SurveyScreen"
      screenOptions={{
        headerTintColor: Colors.primary500,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="SurveyScreen"
        component={SurveyScreen}
        options={{ title: "Survey" }} // Customize the header for this screen
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ title: "Welcome" }} // Customize the header for this screen
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }} // Customize the header for this screen
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
