import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BellIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import WeekView from "../components/WeekViewDisplay/WeekView";
import Button from "../components/ui/Button";

const todayDate = new Date().toISOString().split("T")[0];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {/* avatar and bell icon */}
        <View style={styles.avatarContainer}>
          <View style={styles.text}>
            <Image
              source={require("../assets/animation/Image/icon-user.png")}
              style={{ width: hp(6), height: hp(6) }}
            />
            <View style={styles.textUser}>
              <Text style={{ fontSize: hp(2.7), color: "gray" }}>
                Hello, Noman!
              </Text>
            </View>
          </View>

          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* Calendar */}
        <View style={styles.greetingsContainer}>
          <SafeAreaView style={styles.calendar}>
            <WeekView todayDate={todayDate} />
          </SafeAreaView>
        </View>

        {/* TITLE - See More */}
        <View style={styles.title}>
          <View style={styles.textTitle}>
            <Text style={styles.fontSizeTitle}>Your Meal Plan</Text>
          </View>
          <View style={styles.linkTitle}>
            <Text style={styles.fontSizeLink}> See more</Text>
          </View>
        </View>

        {/* Name of Plan and Kcal */}
        <View style={styles.midContainer}>
          <View style={styles.buttonAdd}>
            <Button>Add</Button>
          </View>
          <View style={styles.midText}>
            <Text style={styles.fontMidText}>Kcal </Text>
          </View>
        </View>

        {/* Meal Date */}

        <View style={styles.bottomContainer}>
          {/* Breakfast */}
          <View style={styles.elementBottom}>
            <View style={styles.titleBottom}>
              <Text style={styles.textBottom}>BreakFast</Text>
            </View>
            <View style={styles.recipesBottom}>
              <Button>Add Meal </Button>
            </View>
          </View>
          {/* Lunch */}
          <View style={styles.elementBottom}>
            <View style={styles.titleBottom}>
              <Text style={styles.textBottom}>Lunch</Text>
            </View>
            <View style={styles.recipesBottom}>
              <Button>Add Meal</Button>
            </View>
          </View>

          {/* Afternoon */}
          <View style={styles.elementBottom}>
            <View style={styles.titleBottom}>
              <Text style={styles.textBottom}> Afternoon </Text>
            </View>
            <View style={styles.recipesBottom}>
              <Button>Add Meal</Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    flexDirection: "row",
  },
  textUser: {
    margin: 10,
  },
  scrollView: {
    paddingBottom: 50,
    paddingTop: 14,
    padding: 6,
  },
  avatarContainer: {
    marginHorizontal: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  greetingsContainer: {
    marginTop: 20,
    marginHorizontal: 4,
    marginBottom: 10,
    spaceY: 2,
  },
  searchBarContainer: {
    marginHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 6,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 17,
    marginBottom: 1,
    paddingLeft: 10,
    letterSpacing: 1,
  },
  magnifyingGlassIcon: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linkTitle: {
    alignItems: "flex-end",
    marginRight: 20,
    justifyContent: "center",
  },
  textTitle: {
    marginLeft: 10,
  },
  fontSizeTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  fontSizeLink: {
    fontSize: 15,
    color: "#7c7c7c",
  },
  midContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
  buttonAdd: {
    backgroundColor: "#979696",
    paddingHorizontal: 100,
    paddingVertical: 40,
    borderRadius: 10,
  },
  midText: {
    justifyContent: "center",
    alignItems: "center",
  },
  fontMidText: {
    fontSize: 20,
  },
  bottomContainer: {},
  elementBottom: {
    marginTop: 25,
  },
  textBottom: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  recipesBottom: {
    backgroundColor: "#976868",
    paddingVertical: 60,
  },
});
