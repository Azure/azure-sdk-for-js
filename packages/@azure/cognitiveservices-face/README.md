# An isomorphic javascript sdk for - FaceClient
This project provides an isomorphic javascript package. Right now it supports:
- node.js version 6.x.x or higher
- browser javascript

## How to Install

- nodejs
```
npm install @azure/cognitiveservices-face
```
- browser
```html
<script type="text/javascript" src="@azure/cognitiveservices-face/dist/cognitiveservices-face.js"></script>
```

## How to use

### nodejs - Authentication, client creation and list personGroupPerson as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import { FaceClient, FaceModels, FaceMappers } from "@azure/cognitiveservices-face";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

const token = "<access_token>";
const creds = new msRest.TokenCredentials(token);
const client = new FaceClient(creds, subscriptionId);
const personGroupId = "testpersonGroupId";
const start = "teststart";
const top = 1;
client.personGroupPerson.list(personGroupId, start, top).then((result) => {
  console.log("The result is:");
  console.log(result);
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and list personGroupPerson as an example written in javascript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-face sample</title>
    <script type="text/javascript" src="./node_modules/ms-rest-js/dist/msRest.browser.js"></script>
    <script type="text/javascript" src="./dist/cognitiveservices-face.js"></script>
    <script type="text/javascript">
      const subscriptionId = "<Subscription_Id>";
      const token = "<access_token>";
      const creds = new msRest.TokenCredentials(token);
      const client = new Azure.CognitiveservicesFace.FaceClient(creds, subscriptionId);
      const personGroupId = "testpersonGroupId";
      const start = "teststart";
      const top = 1;
      client.personGroupPerson.list(personGroupId, start, top).then((result) => {
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
