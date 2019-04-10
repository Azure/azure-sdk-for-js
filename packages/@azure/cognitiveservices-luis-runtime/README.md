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

#### nodejs - Authentication, client creation and resolve prediction as an example written in TypeScript.

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
  });
}).catch((err) => {
  console.error(err);
});
```

#### browser - Authentication, client creation and resolve prediction as an example written in JavaScript.

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


![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fpackages%2F%40azure%2Fcognitiveservices-luis-runtime%2FREADME.png)
