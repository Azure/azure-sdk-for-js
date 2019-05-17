## Azure MicrosoftAzureFDSWebRole SDK for JavaScript

This package contains an isomorphic SDK for MicrosoftAzureFDSWebRole.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/arm-migrate
```

### How to use

#### nodejs - Authentication, client creation and getCluster hyperVCluster as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```bash
npm install @azure/ms-rest-nodeauth
```

##### Sample code

```typescript
import * as msRest from "@azure/ms-rest-js";
import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { MicrosoftAzureFDSWebRole, MicrosoftAzureFDSWebRoleModels, MicrosoftAzureFDSWebRoleMappers } from "@azure/arm-migrate";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new MicrosoftAzureFDSWebRole(creds, subscriptionId);
  const subscriptionId = "testsubscriptionId";
  const resourceGroupName = "testresourceGroupName";
  const siteName = "testsiteName";
  const clusterName = "testclusterName";
  const apiVersion = "testapiVersion";
  client.hyperVCluster.getCluster(subscriptionId, resourceGroupName, siteName, clusterName, apiVersion).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

#### browser - Authentication, client creation and getCluster hyperVCluster as an example written in JavaScript.

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
    <title>@azure/arm-migrate sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/arm-migrate/dist/arm-migrate.js"></script>
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
        const client = new Azure.ArmMigrate.MicrosoftAzureFDSWebRole(res.creds, subscriptionId);
        const subscriptionId = "testsubscriptionId";
        const resourceGroupName = "testresourceGroupName";
        const siteName = "testsiteName";
        const clusterName = "testclusterName";
        const apiVersion = "testapiVersion";
        client.hyperVCluster.getCluster(subscriptionId, resourceGroupName, siteName, clusterName, apiVersion).then((result) => {
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
