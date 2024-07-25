import React, { useState } from "react";
import { Button, Text, View, FlatList, TouchableOpacity } from "react-native";

import "react-native-get-random-values";
const getRandomValues = global.crypto.getRandomValues;
import * as crypto from "crypto";

import { Buffer } from "buffer";
// @ts-expect-error copyBytesFrom and poolSizets are missing from react-native-buffer
global.Buffer = Buffer;

// @ts-expect-error
global.crypto = crypto;
global.crypto.getRandomValues = getRandomValues;

if (typeof process.nextTick == "undefined") {
  process.nextTick = setImmediate;
}

async function runTest(scenario: string): Promise<void> {
  // Likely for static rendering, Metro attempts to load all dependencies when
  // direct importing. This works around that by importing dynamically so that
  // we have a chance to polyfill.
  const m = await import("../src/testSDK");
  await m.testSDK(scenario);
}

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
  <TouchableOpacity onPress={onPress} style={[backgroundColor]}>
    <Text style={[textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

export default function Index() {
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>@azure/service-bus test app</Text>
      <Button title="Run tests!" onPress={() => runTest(selectedId)} />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </View>
  );
}
