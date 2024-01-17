import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const RenderAnalyticsData = ({ data }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 8000);

    return () => clearTimeout(timeoutId);
  }, []);

  const renderLoadingScreen = () => {
    return (
      <View style={styles.loadingAnima}>
        <View>
          <LottieView
            style={styles.animationView}
            source={require("../assets/animation/LoadingFooD.json")}
            autoPlay
            loop
          />
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {loading ? (
        renderLoadingScreen()
      ) : (
        <>
          <Text style={styles.title}>Food Analytics</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Total Calories:</Text>
              <Text style={styles.value}>{data.calories}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>CO2 Emissions Class:</Text>
              <Text style={styles.value}>{data.co2EmissionsClass}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Diet Labels:</Text>
              <Text style={styles.value}>
                {data.dietLabels
                  .map((label) => label.replace(/_/g, " ").toLowerCase())
                  .join(", ")}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Total CO2 Emissions:</Text>
              <Text style={styles.value}>{data.totalCO2Emissions}</Text>
            </View>
            <Text style={styles.subTitle}>Total Nutrients:</Text>
            <View style={styles.nutrientsContainer}>
              {Object.keys(data.totalNutrients).map((nutrientLabel) => (
                <View key={nutrientLabel} style={styles.nutrientRow}>
                  <Text style={styles.nutrientLabel}>{nutrientLabel}:</Text>
                  <Text style={styles.nutrientValue}>
                    {data.totalNutrients[nutrientLabel].quantity}{" "}
                    {data.totalNutrients[nutrientLabel].unit}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 8,
  },
  nutrientsContainer: {
    marginLeft: 16,
  },
  nutrientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  nutrientLabel: {
    fontSize: 14,
  },
  nutrientValue: {
    fontSize: 14,
  },
  loadingAnima: {
    width: 400,
    height: 400,
    justifyContent: "center",
    alignContent: "center",
  },
  animationView: {
    width: 400,
    height: 400,
  },
});

export default RenderAnalyticsData;
