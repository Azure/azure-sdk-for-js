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

They will be used to choose a testing scenario and run it. Open App.tsx and replace the content with following code

```ts
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";

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

- [testSDK.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/samples/frameworks/react-native-expo/ts/messaging/src/testSDK.ts) - contains the code to run the scenarios.
- [ehSendEvents.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/samples/frameworks/react-native-expo/ts/messaging/src/ehSendEvents.ts) - contains the code to send messages to Event Hub.
- [ehReceiveEvents.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/samples/frameworks/react-native-expo/ts/messaging/src/ehReceiveEvents.ts) - contains the code to receive messages from Event Hub.
- [sbSendMessages.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/samples/frameworks/react-native-expo/ts/messaging/src/sbSendMessages.ts) - contains the code to send messages to Service Bus.
- [sbReceiveMessages.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/samples/frameworks/react-native-expo/ts/messaging/src/sbReceiveMessages.ts) - contains the code to receive messages from Service Bus.
- [wsWrapper.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/samples/frameworks/react-native-expo/ts/messaging/src/wsWrapper.ts) - contains the code to wrap `WebSocket` implementation in React Native to set default value of its `binaryType` property to `"blob"`.

### Add dependencies

We need to add JavaScript Client SDK libraries for Event Hubs and Service Bus as dependencies.
We use `@babel/plugin-proposal-async-generator-functions` to help transform async iterator usage.
We also use `babel-plugin-inline-dotenv` to help load secrets from our `.env` file while developing.

```shell
yarn add @azure/event-hubs @azure/service-bus
yarn add --dev babel-plugin-inline-dotenv @babel/plugin-proposal-async-generator-functions
```

Then add the following into `babel.config.js` to enable the plugins

```diff
    presets: ["babel-preset-expo"],
+    plugins: [
+      "@babel/plugin-proposal-async-generator-functions",
+      ["inline-dotenv", { unsafe: true }],
+    ],
```

### Add connection strings to .env file

Create a `.env` file in the project directory. Retrieve your connection strings from Azure portal and add them to the `.env` file. Since this file contains secrets you need to add it to the ignore list if your code is committed to a repository. We also add variables for messaging entity names.

**Note** We use connection string directly here for testing purpose. You should consider the trade-off between security and convenience and better use a backend to dynamically provide secrets to only authenticated users.

```
# Service Bus
SERVICEBUS_CONNECTION_STRING=
QUEUE_NAME=

# Event Hub
EVENTHUB_CONNECTION_STRING=
EVENTHUB_NAME=
CONSUMER_GROUP_NAME=
```

**Note**: Whenever you update the .env file again, you need to clear expo cache and rebuild. It can be done by passing `-c` to the start command, for example, in `package.json`

```diff
-    "android": "expo start --android",
+    "android": "expo start --android -c",
```

### Add polyfills for NodeJS modules

Our dependency `rhea` depends a few NodeJS modules. We need to provide polyfills for them. In this sample, We will be using `node-libs-react-native` and `react-native-get-random-values`. **Note** that it may be possible to slim the polyfills further as the SDK really only needs `process`, and `Buffer` at runtime.

```bash
yarn add node-libs-react-native react-native-get-random-values
```

Add a `metro.config.js` to the root of the project with content of

```js
module.exports = {
  resolver: {
    extraNodeModules: require("node-libs-react-native"),
  },
};
```

In `App.tsx` we need to import the polyfills at the top, before importing any Azure SDK module.

```diff
+import "node-libs-react-native/globals";
+import "react-native-get-random-values";

 import { testSDK } from "./src/testSDK";
```

### Add a WebSocket wrapper

The implementation of `WebSocket` on React-Native doesn't follow the standard, which is causing problem for `rhea` when receiving binary data. We need to add a wrapper around `WebSocket` to fix it.

Add the following to `src/wsWrapper.ts`

```ts
export class WebSocketWrapper {
  constructor(...args) {
    const instance = new globalThis.WebSocket(...args);
    instance.binaryType = "blob";
    return instance;
  }
}
```

Then update our testing code to pass the `webSocketOptions` via the client options when creating clients:

```diff
-import { ServiceBusClient, ServiceBusMessage, ServiceBusMessageBatch } from "@azure/service-bus";
+import { ServiceBusClient, ServiceBusMessage, ServiceBusMessageBatch } from "@azure/service-bus";
+import { WebSocketWrapper } from "./wsWrapper";

// ...

 export async function main() {
-  const sbClient = new ServiceBusClient(connectionString);
+  const sbClient = new ServiceBusClient(connectionString, {
+    webSocketOptions: {
+      webSocket: WebSocketWrapper,
+    },
+  });
```

Now the application should work as expected, sending and receiving Event Hub Events/Service Bus messages.
