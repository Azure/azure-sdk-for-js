## Azure IotHubClient SDK for JavaScript

This package contains an isomorphic SDK for IotHubClient.

> ⚠️ This package @azure/arm-iothub-profile-2020-09-01-hybrid with versions lower than 2.0.0 are going to be deprecated in March 2022, we strongly recommend you to upgrade your dependency on it to version 2.0.0 or above as soon as possible. The deprecate means, it starts the end of support for that library. You can continue to use the libraries indefinitely (as long as the service is running), but after 1 year, no further bug fixes or security fixes will be provided.

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### How to Install

```bash
npm install @azure/arm-iothub-profile-2020-09-01-hybrid
```

### How to use

#### nodejs - Authentication, client creation and list operations as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

- Please install minimum version of `"@azure/ms-rest-nodeauth": "^3.0.0"`.
```bash
npm install @azure/ms-rest-nodeauth@"^3.0.0"
```

##### Sample code

```typescript
import * as msRest from "@azure/ms-rest-js";
import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { IotHubClient, IotHubModels, IotHubMappers } from "@azure/arm-iothub-profile-2020-09-01-hybrid";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new IotHubClient(creds, subscriptionId);
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
    <title>@azure/arm-iothub-profile-2020-09-01-hybrid sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/arm-iothub-profile-2020-09-01-hybrid/dist/arm-iothub-profile-2020-09-01-hybrid.js"></script>
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
        const client = new Azure.ArmIothubProfile20200901Hybrid.IotHubClient(res.creds, subscriptionId);
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/iothub/arm-iothub-profile-2020-09-01-hybrid/README.png)
