import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  View,
  FlatList,
  AsyncStorage,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Item from "./Item";
import { useHeaderHeight } from "react-navigation-stack";

export default function HomeScreen({ navigation }) {
  HomeScreen.navigationOptions = {
    title: "Track your expenses",
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
  const [user, setUser] = useState({});
  const [date, setDate] = useState("");
  const [expense, setExpense] = useState({});

  const [data, setData] = useState([
    {
      id: "1",
      title: "First Item",
      ammount: 100
    },
    {
      id: "2",
      title: "Second Item",
      ammount: 100
    },
    {
      id: "3",
      title: "Third Item",
      ammount: 100
    },
    {
      id: "4",
      title: "Fourth Item",
      ammount: 100
    },
    {
      id: "5",
      title: "Fifth Item",
      ammount: 100
    },
    {
      id: "6",
      title: "Sixth Item",
      ammount: 100
    }
  ]);

  const getDate = () => {
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    return { day: day, month: month, year: year };
  };

  const addExpenses = () => {
    if (expense.title && expense.ammount) {
      expense.date = getDate();
      user.expenses.push(expense);
      user.expenses.map((exp, idx) => (exp.id = toString(idx + 1)));
      setExpense({});
    } else {
      alert("Please enter the details.");
    }
  };

  const deleteItem = id => {
    console.log("working");
    const expensesFiltered = user.expenses.filter(item => item.id !== id);
    setUser({ ...user, expenses: expensesFiltered });
  };

  const loadUserData = () => {
    let userParam = navigation.getParam("user");
    userParam = JSON.parse(userParam);
    if (!userParam.expenses) {
      userParam.expenses = [];
    }
    setUser(userParam);
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
    loadUserData();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Hello {user.username}!</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={expense.title ? expense.title : ""}
          onChangeText={text => setExpense({ ...expense, title: text })}
        />
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="$0"
          value={expense.ammount ? expense.ammount : ""}
          onChangeText={text => setExpense({ ...expense, ammount: text })}
        />
        <Button title="Add" onPress={() => addExpenses()} />
        <Button title="Details" onPress={() => showMoreApp()} />
        <Button title="Sign Out" onPress={() => signOutAsync()} />
        <Button title="Console Log" onPress={() => console.log(user)} />
        <FlatList
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
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    fontSize: 20,
    borderBottomColor: "#555",
    borderBottomWidth: 1,
    marginVertical: 10,
    padding: 10,
    width: 300
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginVertical: 50
  },
  titleList: {
    fontSize: 20,
    marginVertical: 0
  },
  item: {
    padding: 20,
    backgroundColor: "#f1e4e4",
    marginVertical: 2,
    width: 300,
    borderRadius: 10,
    height: 100
  }
});
