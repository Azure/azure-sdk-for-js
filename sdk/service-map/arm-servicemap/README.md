## Azure ServicemapManagementClient SDK for JavaScript

This package contains an isomorphic SDK for ServicemapManagementClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/arm-servicemap
```

### How to use

#### nodejs - Authentication, client creation and listByWorkspace machines as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```bash
npm install @azure/ms-rest-nodeauth
```

##### Sample code

```typescript
import * as msRest from "@azure/ms-rest-js";
import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { ServicemapManagementClient, ServicemapManagementModels, ServicemapManagementMappers } from "@azure/arm-servicemap";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new ServicemapManagementClient(creds, subscriptionId);
  const resourceGroupName = "testresourceGroupName";
  const workspaceName = "testworkspaceName";
  const live = true;
  const startTime = new Date().toISOString();
  const endTime = new Date().toISOString();
  const timestamp = new Date().toISOString();
  const top = 1;
  client.machines.listByWorkspace(resourceGroupName, workspaceName, live, startTime, endTime, timestamp, top).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

#### browser - Authentication, client creation and listByWorkspace machines as an example written in JavaScript.

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
    <title>@azure/arm-servicemap sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/arm-servicemap/dist/arm-servicemap.js"></script>
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
        const client = new Azure.ArmServicemap.ServicemapManagementClient(res.creds, subscriptionId);
        const resourceGroupName = "testresourceGroupName";
        const workspaceName = "testworkspaceName";
        const live = true;
        const startTime = new Date().toISOString();
        const endTime = new Date().toISOString();
        const timestamp = new Date().toISOString();
        const top = 1;
        client.machines.listByWorkspace(resourceGroupName, workspaceName, live, startTime, endTime, timestamp, top).then((result) => {
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fservice-map%2Farm-servicemap%2FREADME.png)
