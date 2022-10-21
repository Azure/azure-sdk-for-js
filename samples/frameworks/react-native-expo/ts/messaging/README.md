# Azure SDK samples for React Native using Expo (TypeScript)

This sample application shows how to use the TypeScript client libraries for Azure in some common scenarios.

In this sample, we build a simple application in React Native using Expo and integrating with Azure Event Hubs and Service Bus.

## Prerequisites

The samples are compatible with LTS versions of Node.js.

The sample is using [Expo](https://expo.dev/), a framework and platform for universal React applications.

You need [an Azure subscription][freesub] and the following resources created to run this sample:

## Step by step

### Create the project

1. Create the project using Expo

```bash
npx create-expo-app messaging
```

2. Add TypeScript support by adding a `tsconfig.json` file with following content

```js
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  }
}
```

3. Run the following Expo command to start the app. Expo will prompt to install TypeScript and types packages for React/React-Native.

```bash
npx expo start
```

Now the application should be bundled and ready to run on device, emulators, or web browsers.

4. Ctrl+C to exit the npm script.

### Add a button and a list box to the app

They will be used to choose a testing scenario and run it.  Open App.tsx and replace the content with following code

```ts
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

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

export default function App() {
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
      <Button title="Run tests!" onPress={() => testSDK(selectedId)} />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
      <StatusBar style="auto" />
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
```
### Add testing code

Add a `src` directory at the root of the project and add the following files
- testSDK.ts
- ehSendEvents.ts
- ehReceiveEvents.ts
- sbSendMessages.ts
- sbReceiveMessages.ts
- wsWrapper.ts

