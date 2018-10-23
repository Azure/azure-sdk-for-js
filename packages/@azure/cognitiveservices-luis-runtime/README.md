# An isomorphic javascript sdk for - LUISRuntimeClient
This project provides an isomorphic javascript package. Right now it supports:
- node.js version 6.x.x or higher
- browser javascript

## How to Install

- nodejs
```
npm install @azure/cognitiveservices-luis-runtime
```
- browser
```html
<script type="text/javascript" src="@azure/cognitiveservices-luis-runtime/dist/cognitiveservices-luis-runtime.js"></script>
```

## How to use

### nodejs - Authentication, client creation and resolve prediction as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import { LUISRuntimeClient, LUISRuntimeModels, LUISRuntimeMappers } from "@azure/cognitiveservices-luis-runtime";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

const token = "<access_token>";
const creds = new msRest.TokenCredentials(token);
const client = new LUISRuntimeClient(creds, subscriptionId);
const appId = "testappId";
const query = "testquery";
const timezoneOffset = 1.01;
const verbose = true;
const staging = true;
const spellCheck = true;
const bingSpellCheckSubscriptionKey = "testbingSpellCheckSubscriptionKey";
const log = true;
client.prediction.resolve(appId, query, timezoneOffset, verbose, staging, spellCheck, bingSpellCheckSubscriptionKey, log).then((result) => {
  console.log("The result is:");
  console.log(result);
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and resolve prediction as an example written in javascript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-luis-runtime sample</title>
    <script type="text/javascript" src="./node_modules/ms-rest-js/dist/msRest.browser.js"></script>
    <script type="text/javascript" src="./dist/cognitiveservices-luis-runtime.js"></script>
    <script type="text/javascript">
      const subscriptionId = "<Subscription_Id>";
      const token = "<access_token>";
      const creds = new msRest.TokenCredentials(token);
      const client = new Azure.CognitiveservicesLuisRuntime.LUISRuntimeClient(creds, subscriptionId);
      const appId = "testappId";
      const query = "testquery";
      const timezoneOffset = 1.01;
      const verbose = true;
      const staging = true;
      const spellCheck = true;
      const bingSpellCheckSubscriptionKey = "testbingSpellCheckSubscriptionKey";
      const log = true;
      client.prediction.resolve(appId, query, timezoneOffset, verbose, staging, spellCheck, bingSpellCheckSubscriptionKey, log).then((result) => {
        console.log("The result is:");
        console.log(result);
      }).catch((err) => {
        console.error(err);
      });
    </script>
  </head>
  <body>
  </body>
</html>
```

# Related projects
 - [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)
