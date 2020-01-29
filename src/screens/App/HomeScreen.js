import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View, AsyncStorage, Text } from "react-native";

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState({});
  let userParam = navigation.getParam("user");
  userParam = JSON.parse(userParam);

  HomeScreen.navigationOptions = {
    title: "Welcome to the app!"
  };

  const showMoreApp = () => {
    navigation.navigate("Other");
  };

  const signOutAsync = async () => {
    let users = await AsyncStorage.getItem("users");
    users = JSON.parse(users);
    users[user.idx].logged = false;
    await AsyncStorage.setItem("users", JSON.stringify(users));
    navigation.navigate("Auth");
  };

  useEffect(() => {
    setUser(userParam);
  }, []);

  return (
    <View style={styles.container}>
      <Text>hi</Text>
      <Button title="Show me more of the app" onPress={() => showMoreApp()} />
      <Button title="Actually, sign me out :)" onPress={() => signOutAsync()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
