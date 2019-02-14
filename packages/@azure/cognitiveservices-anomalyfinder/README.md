## An isomorphic javascript sdk for - AnomalyFinderClient

This package contains an isomorphic SDK for AnomalyFinderClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-anomalyfinder
```

### How to use

#### nodejs - Authentication, client creation and entireDetect  as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```bash
npm install @azure/ms-rest-nodeauth
```

##### Sample code

```typescript
import * as msRest from "@azure/ms-rest-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { AnomalyFinderClient, AnomalyFinderModels, AnomalyFinderMappers } from "@azure/cognitiveservices-anomalyfinder";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new AnomalyFinderClient(creds, subscriptionId);
  const body: AnomalyFinderModels.Request = {
    series: [{
      timestamp: new Date().toISOString(),
      value: 1.01
    }],
    granularity: "yearly",
    customInterval: 1,
    period: 1,
    maxAnomalyRatio: 1.01,
    sensitivity: 1
  };
  client.entireDetect(body).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

#### browser - Authentication, client creation and entireDetect  as an example written in JavaScript.

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
    <title>@azure/cognitiveservices-anomalyfinder sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/cognitiveservices-anomalyfinder/dist/cognitiveservices-anomalyfinder.js"></script>
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
        const client = new Azure.CognitiveservicesAnomalyfinder.AnomalyFinderClient(res.creds, subscriptionId);
        const body = {
          series: [{
            timestamp: new Date().toISOString(),
            value: 1.01
          }],
          granularity: "yearly",
          customInterval: 1,
          period: 1,
          maxAnomalyRatio: 1.01,
          sensitivity: 1
        };
        client.entireDetect(body).then((result) => {
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
