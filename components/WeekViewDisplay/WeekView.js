import React from "react";
import { StyleSheet, Text, View } from "react-native";

const WeekView = ({ todayDate, getMarked }) => {
  const daysInWeek = [];
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date();
    currentDate.setDate(new Date(todayDate).getDate() + i);
    const dayOfWeek = weekdays[currentDate.getDay()];
    const dateNumber = currentDate.getDate();
    const monthNumber = currentDate.getMonth() + 1;

    const isToday =
      currentDate.toISOString().split("T")[0] ===
      new Date(todayDate).toISOString().split("T")[0];

    daysInWeek.push(
      <View key={dayOfWeek} style={[styles.calendar, isToday && styles.today]}>
        {isToday && (
          <View style={styles.month}>
            <Text>/{monthNumber}</Text>
          </View>
        )}
        <View>
          <Text style={styles.textFont}>{dayOfWeek}</Text>
        </View>
        <View style={styles.dateNumber}>
          <Text style={styles.fontSizeDate}>{dateNumber}</Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.container}>{daysInWeek}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  calendar: {
    marginLeft: 5,
  },
  dateNumber: {
    marginTop: 8,
  },
  fontSizeDate: {
    fontSize: 14,
  },
  month: {
    marginBottom: 10,
  },
  textFont: {
    fontSize: 18,
    fontWeight: "bold",
  },
  today: {
    backgroundColor: "lightblue",
    borderRadius: 8,
    padding: 5,
  },
});

export default WeekView;
