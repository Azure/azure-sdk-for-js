# Azure SDK samples for React Native (TypeScript)

This sample application shows how to use the TypeScript client libraries for Azure in some common scenarios.

In this sample, we build a simple application in React Native integrating with Azure App Configuration service.

## Prerequisites

The samples are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript].

You need [an Azure subscription][freesub] and the following resources created to run this sample:

## Step by step

### Create the project

Run React Native CLI to create a blank project with typescript support, give it a name of `appconfigBasic`.

```shell
npx react-native@latest init appconfigBasic
```

At this point, we should be able to see the app running if the environment is set up correctly

```shell
npm run android
```

### Add a button to the app

Open App.tsx and add the following code so it looks similar to following code
```diff
   Text,
+  Button,
   useColorScheme,
...
+import { runAppConfigSample } from "./appConfigSample";

 type SectionProps = PropsWithChildren<{
...
          Edit <Text style={styles.highlight}>App.tsx</Text> to change this
          screen and then come back to see your edits.
+         <Button title="Click me!" onPress={() => runAppConfigSample()} />
```

### Add the App Configuration sample file

create a new file `appConfigSample.ts` in the sample directory as `App.tsx` with following content from [appConfigSample.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/samples/frameworks/react-native/appconfigBasic/appConfigSample.ts) file

### Add dependencies

We need to add a dependency to the JavaScript Client SDK library for Azure App Configuration (version 1.4.0-beta.1 or later). We use `babel-plugin-inline-dotenv` to help load secrets from our `.env` file while developing.

```shell
yarn add @azure/app-configuration@1.4.0-beta.1
yarn add --dev babel-plugin-inline-dotenv
```

Then add the following into `babel.config.js` to enable the plugin

```diff
   presets: ['module:metro-react-native-babel-preset'],
+  plugins: [
+    ["inline-dotenv", { unsafe: true }],
+  ],
```

### Add connection string to .env file

Create a `.env` file in the project directory. Retrieve your connection string from Azure portal and add them to the `.env` file. Since this file contains secrets you need to add it to the ignore list if your code is committed to a repository.

**Note** We use connection string directly here for testing purpose.  You should consider the trade-off between security and convenience and better use a backend to dynamically provide secrets to only authenticated users.

```
APPCONFIG_CONNECTION_STRING="<your app configuration connection string>"
```

### Add polyfills

The cryptography API used by the JavaScript Client SDK library for Azure App Configuration are not available in React Native, so we need to provide polyfills for them. We also need to polyfill `TextEncoder` API, `URLSearchParams` API, and async iterator API. Add the following dependencies to the project

```shell
yarn add isomorphic-webcrypto react-native-get-random-values react-native-url-polyfill text-encoding-polyfill @azure/core-asynciterator-polyfill expo-modules-core
```

Then add a `shims.ts` file in the project root with the following content

```typescript
import '@azure/core-asynciterator-polyfill'
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import 'text-encoding-polyfill';
const getRandomValues = global.crypto.getRandomValues;
import * as crypto from 'isomorphic-webcrypto';
global.crypto = crypto;
global.crypto.getRandomValues = getRandomValues;
```

Then add the following line to `App.tsx` before importing Azure SDK code.

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
 LOG  Running helloworld sample
 LOG  Adding in new setting Samples:Greeting
 LOG  Samples:Greeting has been set to Hello!
 LOG  Samples:Greeting has been set to Goodbye!
 LOG  Samples:Greeting has been deleted
```
