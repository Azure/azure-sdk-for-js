## Azure PowerBIEmbeddedManagementClient SDK for JavaScript

This package contains an isomorphic SDK for PowerBIEmbeddedManagementClient.

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

### How to Install

```
npm install @azure/arm-powerbiembedded
```

### How to use

#### nodejs - Authentication, client creation and getByName workspaceCollections as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```
npm install @azure/ms-rest-nodeauth
```

##### Sample code

```ts
import * as msRest from "@azure/ms-rest-js";
import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
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

#### browser - Authentication, client creation and getByName workspaceCollections as an example written in JavaScript.

##### Install @azure/ms-rest-browserauth

```
npm install @azure/ms-rest-browserauth
```

##### Sample code

See https://github.com/Azure/ms-rest-browserauth to learn how to authenticate to Azure in the browser.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/arm-powerbiembedded sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/arm-powerbiembedded/dist/arm-powerbiembedded.js"></script>
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
  <body></body>
</html>
```

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)


![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fpowerbiembedded%2Farm-powerbiembedded%2FREADME.png)
