## Azure ApplicationInsightsManagementClient SDK for JavaScript

This package contains an isomorphic SDK for ApplicationInsightsManagementClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/arm-applicationinsights
```

### How to use

#### nodejs - Authentication, client creation and list operations as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```bash
npm install @azure/ms-rest-nodeauth
```

##### Sample code

```typescript
import * as coreHttp from "@azure/core-http";
import * as coreArm from "@azure/core-arm";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { ApplicationInsightsManagementClient, ApplicationInsightsManagementModels, ApplicationInsightsManagementMappers } from "@azure/arm-applicationinsights";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new ApplicationInsightsManagementClient(creds, subscriptionId);
  client.operations.list().then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

#### browser - Authentication, client creation and list operations as an example written in JavaScript.

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
    <title>@azure/arm-applicationinsights sample</title>
    <script src="node_modules/@azure/core-http/dist/coreHttp.browser.js"></script>
    <script src="node_modules/@azure/core-arm/dist/coreArm.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/arm-applicationinsights/dist/arm-applicationinsights.js"></script>
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
        const client = new Azure.ArmApplicationinsights.ApplicationInsightsManagementClient(res.creds, subscriptionId);
        client.operations.list().then((result) => {
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/applicationinsights/arm-applicationinsights/README.png)
