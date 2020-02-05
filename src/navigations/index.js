import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage
} from "react-native";

import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

function AuthLoadingScreen({ navigation }) {
  const checkIfLogged = async () => {
    let users = await AsyncStorage.getItem("users");
    users = JSON.parse(users);
    if (!users) {
      navigation.navigate("Auth");
    } else {
      const userLogged = users.find(user => user.logged === true);
      if (!userLogged) {
        navigation.navigate("Auth");
      } else {
        navigation.navigate("Home", { user: JSON.stringify(userLogged) });
      }
    }
  };

  useEffect(() => {
    // AsyncStorage.clear();
    checkIfLogged();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
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

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
