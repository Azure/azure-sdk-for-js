# Azure SDK samples for React Native using Expo (TypeScript)

This sample application shows how to use the TypeScript client libraries for Azure in some common scenarios.

In this sample, we build a simple application in React Native using Expo and integrating with Azure App Configuration service.

## Prerequisites

The samples are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript].

The sample is using [Expo](https://expo.dev/), a framework and platform for universal React applications.

You need [an Azure subscription][freesub] and the following resources created to run this sample:

## Step by step

### Create the project

Run expo CLI to create a blank project with typescript support, give it a name of `appconf-rn-expo`.

```shell
expo init -t expo-template-blank-typescript
```

At this point, we should be able to see the app running if the environment is set up correctly

```shell
expo start --android
```

### Add a button to the app

Open App.tsx and add the following code so it looks similar to following code
```diff
-import { StyleSheet, Text, View } from 'react-native';
+import { Button, StyleSheet, Text, View } from 'react-native';
+import { runAppConfigSample } from "./appConfigSample";
...

      <Text>Open up App.tsx to start working on your app!</Text>
+     <Button title="Click me!" onPress={() => runAppConfigSample() } />
      <StatusBar style="auto" />
```

### Add the App Configuration sample file

create a new file `appConfigSample.ts` in the sample directory as `App.tsx` with following content from [appConfigSample.ts](https://github.com/Azure/azure-sdk-for-js/blob/bbc4e39a31f5dfe6d81b9386cf9d734170dda146/samples/frameworks/react-native-expo/ts/appconfigBasic/appConfigSample.ts) file

### Add dependencies

We need to add a dependency to the JavaScript Client SDK library for Azure App Configuration (version 1.4.0-beta.1 or later). We use `@babel/plugin-proposal-async-generator-functions` to help transform async iterator usage in our sample. We also use `babel-plugin-inline-dotenv` to help load secrets from our `.env` file while developing.

```shell
yarn add @azure/app-configuration@1.4.0-beta.1
yarn add --dev babel-plugin-inline-dotenv @babel/plugin-proposal-async-generator-functions
```

Then add the following into `babel.config.js` to enable the plugin

```diff
    presets: ["babel-preset-expo"],
+    plugins: [
+      "@babel/plugin-proposal-async-generator-functions",
+      ["inline-dotenv", { unsafe: true }],
+    ],
```

### Add connection string to .env file

Create a `.env` file in the project directory. Retrieve your connection string from Azure portal and add them to the `.env` file. Since this file contains secrets you need to add it to the ignore list if your code is committed to a repository.

**Note** We use connection string directly here for testing purpose.  You should consider the trade-off between security and convenience and better use a backend to dynamically provide secrets to only authenticated users.

```
APPCONFIG_CONNECTION_STRING="<your app configuration connection string>"
```

**Note**: if you update the .env file, you would need to clear expo cache and rebuild. It can be done by passing `-c` to the start command, for example, in `package.json`

```diff
-    "android": "expo start --android",
+    "android": "expo start --android -c",
```

### Add polyfills

The `crypto` dependency of the JavaScript Client SDK library for Azure App Configuration are not available in React-Native, so we need to provide polyfills for them. We also need to polyfill the `TextEncoder` API. Add the following dependencies to the project

```shell
yarn add isomorphic-webcrypto react-native-get-random-values react-native-url-polyfill text-encoding-polyfill
```

Then add a `shims.ts` file in the project root with the following content

```typescript
import 'react-native-url-polyfill/auto';
import "react-native-get-random-values";
import "text-encoding-polyfill";
const getRandomValues = global.crypto.getRandomValues;
import * as crypto from "isomorphic-webcrypto";
global.crypto = crypto;
global.crypto.getRandomValues = getRandomValues;
```

Then add the following line to `App.tsx`

```diff
+import "./shims";
import { runAppConfigSample } from "./appConfigSample";
```

Now run the app in the emulator (Android in this case)

```shell
npm run android
```

Click on the **CLICK ME!** button, you should see the following logged to the console output!

```
Running helloworld sample
Adding in new setting Samples:Greeting
Samples:Greeting has been set to Hello!
Samples:Greeting has been set to Goodbye!
Samples:Greeting has been deleted
```
