import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const keyPointsData = [
  "Healthy",
  "Vegetarian",
  "Quick & Easy",
  "Dessert",
  "Low Carb",
  "Vegan",
  "Other",
];

const KeyPointsModal = ({ isVisible, onSelect, onClose, onSaveTags }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleOnSelect = (item) => {
    const isSelected = selectedItems.includes(item);

    if (isSelected) {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((selected) => selected !== item)
      );
    } else {
      setSelectedItems((prevSelected) => [...prevSelected, item]);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleOnSelect(item)}>
      <View
        style={[
          styles.item,
          {
            backgroundColor: selectedItems.includes(item)
              ? "yellow"
              : "#f0f0f0",
          },
        ]}
      >
        <Text>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  const onSave = () => {
    onSaveTags(selectedItems);
    onClose();
    console.log("selected tags:", selectedItems);
  };
  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Select Key Point</Text>
            <View>
              <TouchableOpacity onPress={onSave}>
                <Feather name="plus-circle" size={28} color="#0f7104" />
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={keyPointsData}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            style={styles.flatList}
            numColumns={3}
          />
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalContent: {
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  flatList: {
    maxHeight: 200,
    width: "100%",
    paddingBottom: 40,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 7,
    marginBottom: 10,
    borderRadius: 25,
    marginLeft: 10,
  },
});

export default KeyPointsModal;
