import React, { useState } from "react";
import {
  AsyncStorage,
  StyleSheet,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
  TextInput,
  Button,
  Alert
} from "react-native";

export default function SignInScreen({ navigation }) {
  SignInScreen.navigationOptions = {
    title: "Please sign in",
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  const [currentUser, setCurrentUser] = useState({});
  const [userr, setUser] = useState({ name: "ok" });

  const validatedUsername = username => {
    if (username.length < 3) {
      alert("Username has to have at last 3 characteres");
      return false;
    } else if (/\s/.test(username)) {
      alert("Choose a username without white spaces");
      return false;
    } else {
      return true;
    }
  };

  const onSignIn = async () => {
    let users = await AsyncStorage.getItem("users");
    users = JSON.parse(users);
    if (!users) {
      alert("This user is not registered");
      setCurrentUser({});
      return;
    }
    let foundUser = users.find(user => user.username === currentUser.username);
    if (!foundUser) {
      alert("This user is not registered");
      setCurrentUser({});
      return;
    } else if (foundUser.password === currentUser.password) {
      foundUser.logged = true;
      const userIndex = users.findIndex(
        user => user.username === foundUser.username
      );
      if (userIndex >= 0) {
        foundUser.idx = userIndex;
        users[userIndex] = foundUser;
      } else {
        alert("There has been an error. Please try again");
        setCurrentUser({});
        return;
      }
      await AsyncStorage.setItem("users", JSON.stringify(users));
      navigation.navigate("Home", { user: JSON.stringify(foundUser) });
    } else {
      alert("Password does not match. Try again.");
      setCurrentUser({});
    }
  };

  const onRegister = async () => {
    if (!validatedUsername(currentUser.username)) return;
    let users = await AsyncStorage.getItem("users");
    users = JSON.parse(users);
    if (users === null) {
      const usersArray = [];
      currentUser.expenses = [];
      usersArray.push(currentUser);
      await AsyncStorage.setItem("users", JSON.stringify(usersArray));
      Alert.alert(
        "Great!",
        "You have registered successfully! Now please Login"
      );
      setCurrentUser({});
      return;
    }

    const foundUser = users.find(
      user => user.username === currentUser.username
    );
    if (!foundUser) {
      users.push(currentUser);
      await AsyncStorage.setItem("users", JSON.stringify(users));
      Alert.alert(
        "Great!",
        "You have registered successfully! Now please Login"
      );
      setCurrentUser({});
      return;
    }
    if (foundUser) {
      alert("Username taken!");
      setCurrentUser({});
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Expenses Tracker</Text>
        <View>
          <TextInput
            placeholder="Username"
            style={styles.input}
            autoCorrect={false}
            spellCheck={false}
            onChangeText={text =>
              setCurrentUser({ ...currentUser, username: text })
            }
            value={currentUser.username ? currentUser.username : ""}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
            autoCorrect={false}
            spellCheck={false}
            onChangeText={text =>
              setCurrentUser({ ...currentUser, password: text })
            }
            value={currentUser.password ? currentUser.password : ""}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button style={styles.button} title="Sign In" onPress={onSignIn} />
          <Button style={styles.button} title="Register" onPress={onRegister} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 300,
    marginVertical: 30
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginVertical: 50
  },
  input: {
    fontSize: 20,
    borderBottomColor: "#555",
    borderBottomWidth: 1,
    marginVertical: 10,
    padding: 10,
    width: 300
  }
});
