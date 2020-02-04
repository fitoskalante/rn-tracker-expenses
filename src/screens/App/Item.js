import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Item({ title, deleteItem, id, ammount }) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => console.log(id)}>
      <View style={styles.container}>
        <View>
          <Text style={styles.titleList}>{title}</Text>
          <Text style={styles.titleList}>$ {ammount}</Text>
        </View>
        <View>
          <AntDesign
            name="delete"
            size={32}
            color="red"
            onPress={() => deleteItem(id)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  item: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f1e4e4",
    marginVertical: 5,
    width: 300,
    borderRadius: 10
  },
  titleList: {
    fontSize: 20,
    letterSpacing: 1,
    marginVertical: 5
  }
});
