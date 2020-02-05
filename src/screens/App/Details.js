import Item from "../../components/Item";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Button,
  FlatList,
  StatusBar
} from "react-native";

export default function Details({ navigation }) {
  Details.navigationOptions = {
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

  const deleteItem = id => {
    const expensesFiltered = user.expenses.filter(item => item.id !== id);
    setUser({ ...user, expenses: expensesFiltered });
    users[user.idx].expenses = expensesFiltered;
    setUsers(users);
    AsyncStorage.setItem("users", JSON.stringify(users));
  };
  const deleteAll = () => {
    setUser({ ...user, expenses: [] });
    users[user.idx].expenses = [];
    setUsers(users);
    AsyncStorage.setItem("users", JSON.stringify(users));
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
    <View style={styles.container}>
      {user.expenses && user.expenses.length > 0 ? (
        <>
          <Button title="Delete All Items" onPress={deleteAll} />
          <FlatList
            data={user.expenses}
            renderItem={({ item }) => (
              <Item
                id={item.id}
                title={item.title}
                deleteItem={deleteItem}
                ammount={item.ammount}
                date={item.date}
              />
            )}
            keyExtractor={item => item.id}
          />
          <StatusBar barStyle="default" />
        </>
      ) : (
        <Text style={styles.text}>No expenses</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 20,
    letterSpacing: 1,
    marginVertical: 5,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
    marginTop: "auto",
    marginBottom: "auto"
  }
});
