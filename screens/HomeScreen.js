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

        {/* greetings and punchline */}
        <View style={styles.greetingsContainer}>
          {/* <View>
            <Text
              style={{ fontSize: hp(3.8), fontWeight: "bold", color: "gray" }}
            >
              Make your own food,
            </Text>
          </View> */}
          {/* <View>
            <Text style={{ fontSize: 38, fontWeight: "bold", color: "gray" }}>
              stay at <Text style={{ color: "orange" }}>home</Text>
            </Text>
          </View> */}
          <SafeAreaView style={styles.calendar}>
            <WeekView todayDate={todayDate} />
          </SafeAreaView>
        </View>

        {/* search bar */}
        {/* <View style={styles.searchBarContainer}>
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={styles.searchBarInput}
          />
          <View style={styles.magnifyingGlassIcon}></View>
        </View> */}
        <View style={styles.title}>
          <View style={styles.textTitle}>
            <Text style={styles.fontSizeTitle}>Your Meal Plan</Text>
          </View>
          <View style={styles.linkTitle}>
            <Text style={styles.fontSizeLink}> See more</Text>
          </View>
        </View>
        <View></View>
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
});
