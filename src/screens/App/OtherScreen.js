import React, { useState, useEffect } from "react";
import {
  Button,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  AsyncStorage
} from "react-native";
import Item from "./Item";

export default function OtherScreen({ navigation }) {
  OtherScreen.navigationOptions = {
    title: "Details",
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  const [user, setUser] = useState({});
  const [users, setUsers] = useState({});

  const deleteItem = async id => {
    const expensesFiltered = user.expenses.filter(item => item.id !== id);
    setUser({ ...user, expenses: expensesFiltered });
    users[user.idx].expenses = expensesFiltered;
    setUsers(users);
    await AsyncStorage.setItem("users", JSON.stringify(users));
  };

  const loadUserData = async () => {
    let usersArray = await AsyncStorage.getItem("users");
    setUsers(JSON.parse(usersArray));
    let userParam = navigation.getParam("user");
    userParam = JSON.parse(userParam);
    if (!userParam.expenses) {
      userParam.expenses = [];
    }
    setUser(userParam);
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          style={styles.list}
          data={user.expenses}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              title={item.title}
              deleteItem={deleteItem}
              ammount={item.ammount}
            />
          )}
          keyExtractor={item => item.id}
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />
        <StatusBar barStyle="default" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
