## An isomorphic javascript sdk for - PredictionAPIClient

This package contains an isomorphic SDK for PredictionAPIClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-customvision-prediction
```

### How to use

#### nodejs - Authentication, client creation and classifyImageUrl  as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

- Please install minimum version of `"@azure/ms-rest-nodeauth": "^3.0.0"`.
```bash
npm install @azure/ms-rest-nodeauth@"^3.0.0"
```

##### Sample code

```typescript
import * as msRest from "@azure/ms-rest-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { PredictionAPIClient, PredictionAPIModels, PredictionAPIMappers } from "@azure/cognitiveservices-customvision-prediction";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new PredictionAPIClient(creds, subscriptionId);
  const projectId = ec7b1657-199d-4d8a-bbb2-89a11a42e02a;
  const publishedName = "testpublishedName";
  const imageUrl: PredictionAPIModels.ImageUrl = {
    url: "testurl"
  };
  const application = "testapplication";
  client.classifyImageUrl(projectId, publishedName, imageUrl, application).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

#### browser - Authentication, client creation and classifyImageUrl  as an example written in JavaScript.

##### Install @azure/ms-rest-browserauth

```bash
npm install @azure/ms-rest-browserauth
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
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
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
        const publishedName = "testpublishedName";
        const imageUrl = {
          url: "testurl"
        };
        const application = "testapplication";
        client.classifyImageUrl(projectId, publishedName, imageUrl, application).then((result) => {
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/cognitiveservices/cognitiveservices-customvision-prediction/README.png)
