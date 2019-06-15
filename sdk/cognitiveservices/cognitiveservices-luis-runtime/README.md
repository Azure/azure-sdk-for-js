## An isomorphic javascript sdk for - LUISRuntimeClient

This package contains an isomorphic SDK for LUISRuntimeClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-luis-runtime
```

### How to use

#### nodejs - Authentication, client creation and getVersionPrediction prediction as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```bash
npm install @azure/ms-rest-nodeauth
```

##### Sample code

```typescript
import * as msRest from "@azure/ms-rest-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { LUISRuntimeClient, LUISRuntimeModels, LUISRuntimeMappers } from "@azure/cognitiveservices-luis-runtime";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new LUISRuntimeClient(creds, subscriptionId);
  const appId = ec7b1657-199d-4d8a-bbb2-89a11a42e02a;
  const versionId = "testversionId";
  const predictionRequest: LUISRuntimeModels.PredictionRequest = {
    query: "testquery",
    options: {
      datetimeReference: new Date().toISOString(),
      overridePredictions: true
    },
    externalEntities: [{
      entityName: "testentityName",
      startIndex: 1,
      entityLength: 1,
      resolution: {}
    }],
    dynamicLists: [{
      listEntityName: "testlistEntityName",
      requestLists: [{
        name: "testname",
        canonicalForm: "testcanonicalForm",
        synonyms: ["testsynonyms"]
      }]
    }]
  };
  const verbose = true;
  const showAllIntents = true;
  const log = true;
  client.prediction.getVersionPrediction(appId, versionId, predictionRequest, verbose, showAllIntents, log).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

#### browser - Authentication, client creation and getVersionPrediction prediction as an example written in JavaScript.

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
    <title>@azure/cognitiveservices-luis-runtime sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/cognitiveservices-luis-runtime/dist/cognitiveservices-luis-runtime.js"></script>
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
        const client = new Azure.CognitiveservicesLuisRuntime.LUISRuntimeClient(res.creds, subscriptionId);
        const appId = ec7b1657-199d-4d8a-bbb2-89a11a42e02a;
        const versionId = "testversionId";
        const predictionRequest = {
          query: "testquery",
          options: {
            datetimeReference: new Date().toISOString(),
            overridePredictions: true
          },
          externalEntities: [{
            entityName: "testentityName",
            startIndex: 1,
            entityLength: 1,
            resolution: {}
          }],
          dynamicLists: [{
            listEntityName: "testlistEntityName",
            requestLists: [{
              name: "testname",
              canonicalForm: "testcanonicalForm",
              synonyms: ["testsynonyms"]
            }]
          }]
        };
        const verbose = true;
        const showAllIntents = true;
        const log = true;
        client.prediction.getVersionPrediction(appId, versionId, predictionRequest, verbose, showAllIntents, log).then((result) => {
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
