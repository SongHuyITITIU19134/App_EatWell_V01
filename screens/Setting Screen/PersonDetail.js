import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

const EditProfileScreen = ({ data }) => {
  const navigation = useNavigation();

  console.log(data);

  const handleSaveChanges = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Avatar.Image
        style={styles.avatarImage}
        source={{ uri: user.avatar }}
        size={150}
      /> */}
      <View style={styles.form}>
        <TextInput
          style={styles.textInput}
          label="Name"
          // value={user.name}
          onChangeText={(text) => setUser({ ...user, name: text })}
        />
        <TextInput
          style={styles.textInput}
          label="Email"
          // value={user.email}
          onChangeText={(text) => setUser({ ...user, email: text })}
        />
        <TextInput
          style={styles.textInput}
          label="Address"
          // value={user.address}
          onChangeText={(text) => setUser({ ...user, address: text })}
        />
        <TextInput
          style={styles.textInput}
          label="Age"
          onChangeText={(text) => setUser({ ...user, age: text })}
        />
        <TextInput
          style={styles.textInput}
          label="Sex"
          onChangeText={(text) => setUser({ ...user, sex: text })}
        />
        <Button
          mode="contained"
          onPress={handleSaveChanges}
          style={styles.saveButton}
        >
          Save Changes
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#b7a6d2",
  },
  avatarImage: {
    marginTop: 80,
  },
  form: {
    width: "80%",
    marginTop: 20,
  },
  saveButton: {
    marginTop: 20,
  },
  textInput: {
    marginTop: 10,
  },
});

export default EditProfileScreen;
