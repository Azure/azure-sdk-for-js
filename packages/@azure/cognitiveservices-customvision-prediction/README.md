# An isomorphic javascript sdk for - PredictionAPIClient
This project provides an isomorphic javascript package. Right now it supports:
- node.js version 6.x.x or higher
- browser javascript

## How to Install

- nodejs
```
npm install @azure/cognitiveservices-customvision-prediction
```
- browser
```html
<script type="text/javascript" src="@azure/cognitiveservices-customvision-prediction/dist/cognitiveservices-customvision-prediction.js"></script>
```

## How to use

### nodejs - Authentication, client creation and predictImageUrl  as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import * as msRestNodeAuth from "ms-rest-nodeauth";
import { PredictionAPIClient, PredictionAPIModels, PredictionAPIMappers } from "@azure/cognitiveservices-customvision-prediction";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new PredictionAPIClient(creds, subscriptionId);
  const projectId = ec7b1657-199d-4d8a-bbb2-89a11a42e02a;
  const imageUrl: PredictionAPIModels.ImageUrl = {
    url: "testurl"
  };
  const iterationId = ec7b1657-199d-4d8a-bbb2-89a11a42e02a;
  const application = "testapplication";
  client.predictImageUrl(projectId, imageUrl, iterationId, application).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and predictImageUrl  as an example written in javascript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-customvision-prediction sample</title>
    <script src="node_modules/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/cognitiveservices-customvision-prediction/dist/cognitiveservices-customvision-prediction.js"></script>
    <script type="text/javascript">
      const subscriptionId = "<Subscription_Id>";
      const authManager = new msAuth.AuthManager({
        clientId: "<client id for your Azure AD app>",
        tenant: "<optional tenant for your organization>"
      });
      authManager.finalizeLogin().then((res) => {
        if (!res.isLoggedIn) {
          // may cause redirects
          authManager.login();
        }
        const client = new Azure.CognitiveservicesCustomvisionPrediction.PredictionAPIClient(res.creds, subscriptionId);
        const projectId = ec7b1657-199d-4d8a-bbb2-89a11a42e02a;
        const imageUrl = {
          url: "testurl"
        };
        const iterationId = ec7b1657-199d-4d8a-bbb2-89a11a42e02a;
        const application = "testapplication";
        client.predictImageUrl(projectId, imageUrl, iterationId, application).then((result) => {
          console.log("The result is:");
          console.log(result);
        }).catch((err) => {
          console.log("An error occurred:");
          console.error(err);
        });
      });
    </script>
  </head>
  <body>
  </body>
</html>
```

# Related projects
 - [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)
