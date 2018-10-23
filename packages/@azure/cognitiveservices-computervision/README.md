# An isomorphic javascript sdk for - ComputerVisionClient
This project provides an isomorphic javascript package. Right now it supports:
- node.js version 6.x.x or higher
- browser javascript

## How to Install

- nodejs
```
npm install @azure/cognitiveservices-computervision
```
- browser
```html
<script type="text/javascript" src="@azure/cognitiveservices-computervision/dist/cognitiveservices-computervision.js"></script>
```

## How to use

### nodejs - Authentication, client creation and listModels  as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import { ComputerVisionClient, ComputerVisionModels, ComputerVisionMappers } from "@azure/cognitiveservices-computervision";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

const token = "<access_token>";
const creds = new msRest.TokenCredentials(token);
const client = new ComputerVisionClient(creds, subscriptionId);
client.listModels().then((result) => {
  console.log("The result is:");
  console.log(result);
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and listModels  as an example written in javascript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-computervision sample</title>
    <script type="text/javascript" src="./node_modules/ms-rest-js/dist/msRest.browser.js"></script>
    <script type="text/javascript" src="./dist/cognitiveservices-computervision.js"></script>
    <script type="text/javascript">
      const subscriptionId = "<Subscription_Id>";
      const token = "<access_token>";
      const creds = new msRest.TokenCredentials(token);
      const client = new Azure.CognitiveservicesComputervision.ComputerVisionClient(creds, subscriptionId);
      client.listModels().then((result) => {
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
