import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  View,
  SafeAreaView,
  AsyncStorage,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { NavigationEvents } from "react-navigation";

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
  const [reload, setReload] = useState(false);
  const [users, setUsers] = useState({});
  const [user, setUser] = useState({});
  const [expense, setExpense] = useState({});
  const [currentDate, setCurrentDate] = useState({});
  const [totalDayExpenses, setTotalDayExpenses] = useState(0);

  const getTotalExpensesForCurrentDay = () => {
    if (user.expenses) {
      const todayExpenses = user.expenses.filter(
        exp => JSON.stringify(exp.date) === JSON.stringify(currentDate)
      );
      if (todayExpenses.length === 0) {
        setTotalDayExpenses(0);
        return;
      } else {
        const reducer = (accumulator, currentValue) =>
          accumulator + currentValue;

        const sumTotal = todayExpenses.map(exp => exp.ammount).reduce(reducer);
        if (!sumTotal) {
          setTotalDayExpenses(0);
        } else {
          setTotalDayExpenses(sumTotal);
        }
      }
    } else {
      setTotalDayExpenses(0);
    }
  };

  const getDate = () => {
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    return { day: day, month: month, year: year };
  };

  const addExpenses = async () => {
    if (expense.title && expense.ammount) {
      expense.ammount = Number(expense.ammount);
      expense.date = getDate();
      user.expenses.unshift(expense);
      user.expenses.map((exp, idx) => {
        exp.id = (idx + 1).toString();
      });
      users[user.idx] = user;
      setUsers(users);
      await AsyncStorage.setItem("users", JSON.stringify(users));
      setExpense({});
      getTotalExpensesForCurrentDay();
    } else {
      alert("Please enter the details.");
    }
  };

  const loadUserData = async () => {
    let usersArray = await AsyncStorage.getItem("users");
    usersArray = JSON.parse(usersArray);
    setUsers(usersArray);
    if (Object.keys(user).length === 0) {
      let userParam = navigation.getParam("user");
      userParam = JSON.parse(userParam);
      if (!userParam.expenses) {
        userParam.expenses = [];
      }
      setUser(userParam);
      return;
    } else {
      const updatedUser = usersArray.filter(u => u.username === user.username);
      if (updatedUser[0].expenses.toString() === user.expenses.toString()) {
      } else {
        setUser(updatedUser[0]);
      }
    }
  };

  const seeDetails = () => {
    navigation.navigate("Other", { user: JSON.stringify(user) });
  };

  const signOutAsync = async () => {
    users[user.idx].logged = false;
    await AsyncStorage.setItem("users", JSON.stringify(users));
    navigation.navigate("Auth");
  };

  useEffect(() => {
    loadUserData();
    setCurrentDate(getDate());
  }, [reload]);

  useEffect(() => {
    getTotalExpensesForCurrentDay();
  }, [user]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>
        <NavigationEvents onWillFocus={() => setReload(!reload)} />
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Hello {user.username}!</Text>
          <View style={styles.totalContainer}>
            <Text style={styles.subtitle}>Today you have spent:</Text>
            <Text style={styles.subtitle}>$ {totalDayExpenses}</Text>
            <Button title="Details" onPress={() => seeDetails()} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Title"
            textAlign={"center"}
            value={expense.title ? expense.title : ""}
            onChangeText={text => setExpense({ ...expense, title: text })}
          />
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            placeholder="$ 0"
            textAlign={"center"}
            value={expense.ammount ? expense.ammount.toString() : ""}
            onChangeText={text => setExpense({ ...expense, ammount: text })}
          />
          <Button title="Add" onPress={() => addExpenses()} />
          <Button title="Sign Out" onPress={() => signOutAsync()} />
        </SafeAreaView>
      </>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  totalContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ddd",
    padding: 20,
    borderRadius: 20,
    height: 200,
    marginVertical: 30
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
    fontSize: 25,
    marginBottom: 10,
    marginTop: 20
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 25,
    marginVertical: 10
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
