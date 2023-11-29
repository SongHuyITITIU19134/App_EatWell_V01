import React from "react";
import {
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function Categories({
  categories,
  activeCategory,
  handleChangeCategory,
}) {
  return (
    <Animated.View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        style={{ marginTop: 12 }}
      >
        {categories.map((cat, index) => {
          let isActive = cat.strCategory === activeCategory;
          let activeButtonStyle = isActive
            ? { backgroundColor: "#FFC107" }
            : { backgroundColor: "rgba(0,0,0,0.1)" };
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.strCategory)}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 8,
                ...activeButtonStyle,
                borderRadius: 12,
                padding: 6,
              }}
            >
              <Image
                source={{ uri: cat.strCategoryThumb }}
                style={{ width: hp(6), height: hp(6), borderRadius: 50 }}
              />
              <Text style={{ fontSize: hp(1.6), color: "gray", marginTop: 4 }}>
                {cat.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
