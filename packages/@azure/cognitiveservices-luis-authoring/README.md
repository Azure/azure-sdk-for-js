# An isomorphic javascript sdk for - LUISAuthoringClient
This project provides an isomorphic javascript package. Right now it supports:
- node.js version 6.x.x or higher
- browser javascript

## How to Install

- nodejs
```
npm install @azure/cognitiveservices-luis-authoring
```
- browser
```html
<script type="text/javascript" src="@azure/cognitiveservices-luis-authoring/dist/cognitiveservices-luis-authoring.js"></script>
```

## How to use

### nodejs - Authentication, client creation and listPhraseLists features as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import { LUISAuthoringClient, LUISAuthoringModels, LUISAuthoringMappers } from "@azure/cognitiveservices-luis-authoring";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

const token = "<access_token>";
const creds = new msRest.TokenCredentials(token);
const client = new LUISAuthoringClient(creds, subscriptionId);
const appId = ec7b1657-199d-4d8a-bbb2-89a11a42e02a;
const versionId = "testversionId";
const skip = 1;
const take = 1;
client.features.listPhraseLists(appId, versionId, skip, take).then((result) => {
  console.log("The result is:");
  console.log(result);
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and listPhraseLists features as an example written in javascript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-luis-authoring sample</title>
    <script type="text/javascript" src="./node_modules/ms-rest-js/dist/msRest.browser.js"></script>
    <script type="text/javascript" src="./dist/cognitiveservices-luis-authoring.js"></script>
    <script type="text/javascript">
      const subscriptionId = "<Subscription_Id>";
      const token = "<access_token>";
      const creds = new msRest.TokenCredentials(token);
      const client = new Azure.CognitiveservicesLuisAuthoring.LUISAuthoringClient(creds, subscriptionId);
      const appId = ec7b1657-199d-4d8a-bbb2-89a11a42e02a;
      const versionId = "testversionId";
      const skip = 1;
      const take = 1;
      client.features.listPhraseLists(appId, versionId, skip, take).then((result) => {
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
