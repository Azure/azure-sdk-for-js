## An isomorphic javascript sdk for - PredictionAPIClient

This package contains an isomorphic SDK for PredictionAPIClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```
npm install @azure/cognitiveservices-customvision-prediction
```

### How to use

#### nodejs - Authentication, client creation and predictImageUrl  as an example written in TypeScript.

##### Install ms-rest-nodeauth

```
npm install ms-rest-nodeauth
```

##### Sample code

```ts
import * as msRest from "@azure/ms-rest-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
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

#### browser - Authentication, client creation and predictImageUrl  as an example written in JavaScript.

##### Install ms-rest-browserauth

```
npm install ms-rest-browserauth
```

##### Sample code

See https://github.com/Azure/ms-rest-browserauth to learn how to authenticate to Azure in the browser.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-customvision-prediction sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
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
  <body></body>
</html>
```

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)
