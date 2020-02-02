import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Item({ title, deleteItem, id, ammount }) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => deleteItem(id)}>
      <Text style={styles.titleList}>{title}</Text>
      <Text style={styles.titleList}>$ {ammount}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
