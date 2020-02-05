import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Item({ title, deleteItem, id, ammount, date }) {
  return (
    <View style={styles.container}>
      <View style={styles.halfContainer}>
        <Text style={styles.title}>{title}</Text>
        <AntDesign
          name="close"
          size={25}
          color="red"
          onPress={() => deleteItem(id)}
        />
      </View>
      <View style={styles.halfContainer}>
        <Text style={styles.ammount}>$ {ammount}</Text>
        <Text style={styles.date}>
          {date.day}/{date.month}/{date.year}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: "#f1e4e4"
  },
  halfContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5
  },
  title: {
    fontSize: 20,
    letterSpacing: 1,
    marginVertical: 5
  },
  ammount: {
    fontSize: 20,
    letterSpacing: 1,
    marginVertical: 5,
    fontWeight: "bold"
  },
  date: {
    fontSize: 15,
    letterSpacing: 1,
    marginVertical: 5,
    color: "gray"
  }
});
