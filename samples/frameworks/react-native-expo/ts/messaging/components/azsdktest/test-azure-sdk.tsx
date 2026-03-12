import React, { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import "./src/polyfills";
import { testSDK } from "./src/testSDK";

const DATA = [
  {
    id: "eh-send-msgs",
    title: "Event Hub: Send Messages",
  },
  {
    id: "eh-receive-msgs",
    title: "Event Hub: Receive Messages",
  },
  {
    id: "sb-send-msgs",
    title: "Service Bus: Send Messages",
  },
  {
    id: "sb-receive-msgs",
    title: "Service Bus: Receive Messages",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

export function TestAzureSDK() {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text>@azure/service-bus test app</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
      <Button title="Run tests!" onPress={() => testSDK(selectedId)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
