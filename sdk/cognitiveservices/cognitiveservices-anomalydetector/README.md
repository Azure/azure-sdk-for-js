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

#### nodejs - client creation and getMultivariateModel  as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

- Please install minimum version of `"@azure/ms-rest-nodeauth": "^3.0.0"`.
```bash
npm install @azure/ms-rest-nodeauth@"^3.0.0"
```

##### Sample code

While the below sample uses the interactive login, other authentication options can be found in the [README.md file of @azure/ms-rest-nodeauth](https://www.npmjs.com/package/@azure/ms-rest-nodeauth) package
```typescript
const msRestNodeAuth = require("@azure/ms-rest-nodeauth");
const { AnomalyDetectorClient } = require("@azure/cognitiveservices-anomalydetector");
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new AnomalyDetectorClient(creds, subscriptionId);
  const modelId = ec7b1657-199d-4d8a-bbb2-89a11a42e02a;
  client.getMultivariateModel(modelId).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

#### browser - Authentication, client creation and getMultivariateModel  as an example written in JavaScript.

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
        const modelId = ec7b1657-199d-4d8a-bbb2-89a11a42e02a;
        client.getMultivariateModel(modelId).then((result) => {
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
