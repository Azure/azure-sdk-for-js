# An isomorphic javascript sdk for - TrainingAPIClient
This project provides an isomorphic javascript package. Right now it supports:
- node.js version 6.x.x or higher
- browser javascript

## How to Install

- nodejs
```
npm install @azure/cognitiveservices-customvision-training
```
- browser
```html
<script type="text/javascript" src="@azure/cognitiveservices-customvision-training/dist/cognitiveservices-customvision-training.js"></script>
```

## How to use

### nodejs - Authentication, client creation and getDomains  as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import { TrainingAPIClient, TrainingAPIModels, TrainingAPIMappers } from "@azure/cognitiveservices-customvision-training";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

const token = "<access_token>";
const creds = new msRest.TokenCredentials(token);
const client = new TrainingAPIClient(creds, subscriptionId);
client.getDomains().then((result) => {
  console.log("The result is:");
  console.log(result);
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and getDomains  as an example written in javascript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-customvision-training sample</title>
    <script type="text/javascript" src="./node_modules/ms-rest-js/dist/msRest.browser.js"></script>
    <script type="text/javascript" src="./dist/cognitiveservices-customvision-training.js"></script>
    <script type="text/javascript">
      const subscriptionId = "<Subscription_Id>";
      const token = "<access_token>";
      const creds = new msRest.TokenCredentials(token);
      const client = new Azure.CognitiveservicesCustomvisionTraining.TrainingAPIClient(creds, subscriptionId);
      client.getDomains().then((result) => {
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
