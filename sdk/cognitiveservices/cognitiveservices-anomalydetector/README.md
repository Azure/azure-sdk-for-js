## An isomorphic javascript sdk for - AnomalyDetectorClient

This package contains an isomorphic SDK for AnomalyDetectorClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-anomalydetector
```

### How to use

#### nodejs - Authentication, client creation and entireDetect  as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

- Please install minimum version of `"@azure/ms-rest-nodeauth": "^3.0.0"`.
```bash
npm install @azure/ms-rest-nodeauth@"^3.0.0"
```

##### Sample code

```typescript
import * as msRest from "@azure/ms-rest-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { AnomalyDetectorClient, AnomalyDetectorModels, AnomalyDetectorMappers } from "@azure/cognitiveservices-anomalydetector";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new AnomalyDetectorClient(creds, subscriptionId);
  const body: AnomalyDetectorModels.Request = {
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
    <title>@azure/cognitiveservices-anomalydetector sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/cognitiveservices-anomalydetector/dist/cognitiveservices-anomalydetector.js"></script>
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
        const client = new Azure.CognitiveservicesAnomalydetector.AnomalyDetectorClient(res.creds, subscriptionId);
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/cognitiveservices/cognitiveservices-anomalydetector/README.png)
