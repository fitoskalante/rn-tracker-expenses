import React from "react";
import {
  Button,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage
} from "react-native";

export default function OtherScreen({ navigation }) {
  OtherScreen.navigationOptions = {
    title: "Other Screen"
  };

  const signOutAsync = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Auth");
  };

  return (
    <View style={styles.container}>
      <Button title="I'm done, sign me out" onPress={() => signOutAsync()} />
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
