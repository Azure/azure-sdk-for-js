# Azure SDK samples for React Native (TypeScript)

This sample application shows how to use the TypeScript client libraries for Azure in some common scenarios.

In this sample, we build a simple application in React Native integrating with Azure App Configuration service.

## Prerequisites

The samples are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] and the following resources created to run this sample:

- App Configuration resource

## Step by step

### Create the project

Run the following command to create a blank project, give it a name of `appconfig`.

```shell
npx create-expo-app@latest appconfig
```

At this point, we should be able to see the app running if the environment is set up correctly

```shell
cd appconfig
npm run android
```

### Add a button to the app

Open app/(tabs)/index.tsx and add the following code so it looks similar to following code
```diff
-import { Image, StyleSheet, Platform } from 'react-native';
+import { Button, Image, StyleSheet, Platform } from 'react-native';
...
+import { runAppConfigSample } from "../../src/appConfigSample";

 export default function HomeScreen() {
...
          Edit <Text style={styles.highlight}>App.tsx</Text> to change this
          screen and then come back to see your edits.
+         <Button title="CLICK ME!" onPress={() => runAppConfigSample()} />
```

### Add the App Configuration sample file

create a `src` folder under the project root and add a new file `appConfigSample.ts` in it with following content from [appConfigSample.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/samples/frameworks/react-native-expo/appconfig/src/appConfigSample.ts) file

### Add dependencies

We need to add a dependency to the JavaScript Client SDK library for Azure App Configuration.

```shell
npm add @azure/app-configuration
```

### Add connection string to .env file

Create a `.env` file in the project directory. Retrieve your connection string from Azure portal and add them to the `.env` file. Since this file contains secrets you need to add it to the ignore list if your code is committed to a repository.

**Note** We use connection string directly here for testing purpose.  You should consider secure ways of storing sensitive information as recommended by React-Native/Expo. Please see https://docs.expo.dev/guides/environment-variables/#reading-environment-variables-from-env-files for more information.

```
EXPO_PUBLIC_APPCONFIG_CONNECTION_STRING="<your app configuration connection string>"
```

### Customize Metro

Run the following command to generate the Metro bundler configuration file

```shell
npx expo customize metro.config.js
```

then update the added `metro.config.js` to enable the beta feature so we could utilize the conditional exports in Azure SDK packages.

```js
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver = {
  ...config.resolver,
  unstable_enablePackageExports: true,
};

module.exports = config;
```

### Add polyfills

The cryptography API used by the JavaScript Client SDK library for Azure App Configuration are not available in React Native, so we need to provide polyfills for them. We also need to polyfill `TextEncoder` API, `URLSearchParams` API, and async iterator API. Add the following dependencies to the project

```shell
npm add isomorphic-webcrypto react-native-get-random-values react-native-url-polyfill text-encoding-polyfill @azure/core-asynciterator-polyfill
```

Add the following lines to `metro.config.js`:

```diff
config.resolver = {
  ...config.resolver,
  unstable_enablePackageExports: true,
+  extraNodeModules: {
+    crypto: require.resolve('isomorphic-webcrypto/src/react-native'),
+  },
};

```

Then add a `shims.ts` file under `src/` with the following content

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

Then add the following line to `app/(tabs)/index.tsx`, just before importing Azure SDK code.

```diff
+import "../../src/shims";
import { runAppConfigSample } from "../../src/appConfigSample";
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
