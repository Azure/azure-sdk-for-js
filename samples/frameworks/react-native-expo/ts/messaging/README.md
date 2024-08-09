# Azure SDK samples for React Native using Expo (TypeScript)

This sample application shows how to use the TypeScript client libraries for Azure in some common scenarios.

In this sample, we build a simple application in React Native using Expo and integrating with Azure Event Hubs and Service Bus.

## Prerequisites

The samples are compatible with LTS versions of Node.js.

The sample is using [Expo](https://expo.dev/), a framework and platform for universal React applications.

You need [an Azure subscription][freesub] and the following resources created to run this sample:

- Azure Service Bus namespace and a queue created under it.
- Azure Event Hubs namespace and a topic created under it.

## Step by step

### Create the project

1. Create the project using Expo CLI

```bash
npx create-expo-app messaging
```

2. Run the following Expo command to start the application.

```bash
npx expo start
```

Now the application should be bundled and ready to run on device, emulators, or web browsers.

3. Ctrl+C to exit the npm script.

4. Run the following command so that we can start fresh

```bash
npm run reset-project
```

### Add a button and a list box to the app

They will be used to choose a testing scenario and run it. Open app/index.tsx and replace its content with following code

```ts
import React, { useState } from "react";
import { Button, Text, View, FlatList, TouchableOpacity } from "react-native";

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

```shell
npm add @azure/event-hubs @azure/service-bus
```

### Add connection strings to .env file

Create a `.env` file in the project directory. Retrieve your connection strings from Azure portal and add them to the `.env` file. Since this file contains secrets you need to add it to the ignore list if your code is committed to a repository. We also add variables for messaging entity names.

**Note** We use connection string directly here for testing purpose. You should consider secure ways of storing sensitive information as recommended by React-Native/Expo. Please see https://docs.expo.dev/guides/environment-variables/#reading-environment-variables-from-env-files for more information.

```
# Service Bus
EXPO_PUBLIC_SERVICEBUS_CONNECTION_STRING=
EXPO_PUBLIC_QUEUE_NAME=

# Event Hub
EXPO_PUBLIC_EVENTHUB_CONNECTION_STRING=
EXPO_PUBLIC_EVENTHUB_NAME=
EXPO_PUBLIC_CONSUMER_GROUP_NAME=
```

### Add polyfills for NodeJS modules

Our dependency `rhea` depends a few NodeJS modules. We need to provide polyfills for them. We need polyfills for `os`, `process`, `path`, and `util`.  We also need `cryto`, `buffer`, and `TextEncoder/TextDecoder` Apis.  In this sample, we are using the following packages, however, other polyfill packages may work too.

```bash
npm add buffer os-browserify path-browserify process text-encoding-polyfill isomorphic-webcrypto react-native-get-random-values util
```

Run the following command, which will add a `metro.config.js` to the root of the project.

```bash
npx expo customize metro.config.js
```

add the following so the file look like

```js
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver = {
  ...config.resolver,
  unstable_enablePackageExports: true,
  extraNodeModules: {
    ...config.resolver.extraNodeModules,
    buffer: require.resolve("buffer/"),
    os: require.resolve("os-browserify/browser"),
    process: require.resolve("process/browser"),
    path: require.resolve("path-browserify"),
    crypto: require.resolve("isomorphic-webcrypto/src/react-native"),
  },
};

module.exports = config;
```

The last thing we need to do is setting up the polyfills, before calling any Azure SDK code. For example, in app/index.tsx:

```diff
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
...
```

### Use a WebSocket wrapper

The implementation of `WebSocket` on React-Native doesn't follow the standard, which is causing problem for `rhea` when receiving binary data. We need to add a wrapper around `WebSocket` to fix it.

Update our testing code to pass the `webSocketOptions` via the client options when creating clients:

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
