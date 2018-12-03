# Azure PowerBIEmbeddedManagementClient SDK for JavaScript
This package contains an isomorphic SDK for PowerBIEmbeddedManagementClient.

## Currently supported environments
- Node.js version 6.x.x or higher
- Browser JavaScript

## How to Install
```
npm install @azure/arm-powerbiembedded
```


## How to use

### nodejs - Authentication, client creation and getByName workspaceCollections as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import * as msRestAzure from "ms-rest-azure-js";
import * as msRestNodeAuth from "ms-rest-nodeauth";
import { PowerBIEmbeddedManagementClient, PowerBIEmbeddedManagementModels, PowerBIEmbeddedManagementMappers } from "@azure/arm-powerbiembedded";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new PowerBIEmbeddedManagementClient(creds, subscriptionId);
  const resourceGroupName = "testresourceGroupName";
  const workspaceCollectionName = "testworkspaceCollectionName";
  client.workspaceCollections.getByName(resourceGroupName, workspaceCollectionName).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and getByName workspaceCollections as an example written in JavaScript.
See https://github.com/Azure/ms-rest-browserauth to learn how to authenticate to Azure in the browser.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/arm-powerbiembedded sample</title>
    <script src="node_modules/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/arm-powerbiembedded/dist/arm-powerbiembedded.js"></script>
    <script>
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
        const client = new Azure.ArmPowerbiembedded.PowerBIEmbeddedManagementClient(res.creds, subscriptionId);
        const resourceGroupName = "testresourceGroupName";
        const workspaceCollectionName = "testworkspaceCollectionName";
        client.workspaceCollections.getByName(resourceGroupName, workspaceCollectionName).then((result) => {
          console.log("The result is:");
          console.log(result);
        }).catch((err) => {
          console.log("An error occurred:");
          console.error(err);
        });
      });
    </script>
  </head>
  <body>
  </body>
</html>
```

# Related projects
 - [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)
