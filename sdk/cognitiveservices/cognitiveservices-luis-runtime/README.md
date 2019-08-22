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

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code

```typescript
import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";
import { LUISRuntimeClient } from "@azure/cognitiveservices-luis-runtime";

let authoringKey = "<luis-authoring-key>";
const creds = new CognitiveServicesCredentials(authoringKey);

// change "westus" in the endpoint url based on your region, check the following link
// https://docs.microsoft.com/en-us/azure/cognitive-services/luis/luis-reference-regions
const client = new LUISRuntimeClient(creds, "https://westus.api.cognitive.microsoft.com/");

const appId = "<your-app-id>"; // replace this with your appId.
const versionId = "0.1"; // replace with version of your luis application. Initial value will be 0.1

const predictionRequest = {
    query: "testquery",
    options: {
        datetimeReference: new Date(),
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

client.prediction.getVersionPrediction(appId, versionId, predictionRequest, { verbose, showAllIntents }).then((result) => {
    console.log("The result is:");
    console.log(result);
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/cognitiveservices/cognitiveservices-luis-runtime/README.png)
