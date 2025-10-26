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
npx create-expo-app@3.5.3 messaging
```

2. Run the following Expo command to start the app. Expo will prompt to install TypeScript and types packages for React/React-Native.

```bash
npx expo start
```

Now the application should be bundled and ready to run on device, emulators, or web browsers.

4. Ctrl+C to exit the npm script.

### Add a button and a list box to the app

They will be used to choose a testing scenario and run it. Create a `azsdktest` directory under `components/`, add a file `test-azure-sdk.tsx` with the following content

```ts
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
```

### Add testing code

Add a `src` directory under `components/azsdktest/` and add the following files

- [testSDK.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/samples/frameworks/react-native-expo/ts/messaging/components/azsdktest/src/testSDK.ts) - contains the code to run the scenarios.
- [ehSendEvents.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/samples/frameworks/react-native-expo/ts/messaging/components/azsdktest/src/ehSendEvents.ts) - contains the code to send messages to Event Hub.
- [ehReceiveEvents.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/samples/frameworks/react-native-expo/ts/messaging/components/azsdktest/src/ehReceiveEvents.ts) - contains the code to receive messages from Event Hub.
- [sbSendMessages.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/samples/frameworks/react-native-expo/ts/messaging/components/azsdktest/src/sbSendMessages.ts) - contains the code to send messages to Service Bus.
- [sbReceiveMessages.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/samples/frameworks/react-native-expo/ts/messaging/components/azsdktest/src/sbReceiveMessages.ts) - contains the code to receive messages from Service Bus.
- [wsWrapper.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/samples/frameworks/react-native-expo/ts/messaging/components/azsdktest/src/wsWrapper.ts) - contains the code to wrap `WebSocket` implementation in React Native to set default value of its `binaryType` property to `"blob"`.
- [polyfills.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/samples/frameworks/react-native-expo/ts/messaging/components/azsdktest/src/polyfills.ts) - contains polyfills

### Add dependencies

We need to add JavaScript Client SDK libraries for Event Hubs and Service Bus as dependencies.

```shell
npm add @azure/event-hubs @azure/service-bus@7.10.0-beta.2
npx expo customize metro.config.js
```

### Add connection strings to .env file

Create a `.env` file in the project directory. Retrieve your connection strings from Azure portal and add them to the `.env` file. Since this file contains secrets you need to add it to the ignore list if your code is committed to a repository. We also add variables for messaging entity names.

**Note** We use connection string directly here for testing purpose. You should never do this for real applications. Consider the trade-off between security and convenience and better use a backend to dynamically provide secrets to only authenticated users. Please refer to Expo documentation about environment variables.

```
EXPO_PUBLIC_SERVICEBUS_CONNECTION_STRING=
EXPO_PUBLIC_QUEUE_NAME=

# Event Hub
EXPO_PUBLIC_EVENTHUB_CONNECTION_STRING=
EXPO_PUBLIC_EVENTHUB_NAME=
EXPO_PUBLIC_CONSUMER_GROUP_NAME=
```

**Note**: Whenever you update the .env file again, you need to clear expo cache and rebuild. It can be done by passing `-c/--clear` to the start command, for example, in `package.json`

```diff
-    "android": "expo start --android",
+    "android": "expo start --android -c",
```

### Add polyfills for NodeJS modules

Our dependency `rhea` depends a few NodeJS modules. We need to provide polyfills for them. In this sample, We will be using
- buffer
- os-browserify
- path-browserify
- process
- isomorphic-webcrypto

```bash
npm add buffer os-browserify path-browserify process isomorphic-webcrypto
```

Add a `metro.config.js` to the root of the project with content of

```js
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = true;
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  crypto: require.resolve("isomorphic-webcrypto/src/react-native"),
  os: require.resolve("os-browserify"),
  path: require.resolve("path-browserify"),
  process: require.resolve("process/browser"),
  buffer: require.resolve("buffer/"),
};

module.exports = config;
```

In `app/(tabs)/index.tsx` we need to import and use our component

```
+import { TestAzureSDK } from "@/components/azsdktest/test-azure-sdk";
import ParallaxScrollView from "@/components/parallax-scroll-view";

// ...

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <TestAzureSDK />
      </ThemedView>
    </ParallaxScrollView>
  );
}

// ...
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

Now the application should run, sending and receiving Event Hub Events/Service Bus messages.
