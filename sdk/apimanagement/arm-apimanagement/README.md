## Azure ApiManagementClient SDK for JavaScript

This package contains an isomorphic SDK for ApiManagementClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/arm-apimanagement
```

### How to use

#### nodejs - Authentication, client creation and listByService api as an example written in TypeScript.

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
import { ApiManagementClient, ApiManagementModels, ApiManagementMappers } from "@azure/arm-apimanagement";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new ApiManagementClient(creds, subscriptionId);
  const resourceGroupName = "testresourceGroupName";
  const serviceName = "testserviceName";
  const filter = "testfilter";
  const top = 1;
  const skip = 1;
  const tags = "testtags";
  const expandApiVersionSet = true;
  client.api.listByService(resourceGroupName, serviceName, filter, top, skip, tags, expandApiVersionSet).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

#### browser - Authentication, client creation and listByService api as an example written in JavaScript.

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
    <title>@azure/arm-apimanagement sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/arm-apimanagement/dist/arm-apimanagement.js"></script>
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
        const client = new Azure.ArmApimanagement.ApiManagementClient(res.creds, subscriptionId);
        const resourceGroupName = "testresourceGroupName";
        const serviceName = "testserviceName";
        const filter = "testfilter";
        const top = 1;
        const skip = 1;
        const tags = "testtags";
        const expandApiVersionSet = true;
        client.api.listByService(resourceGroupName, serviceName, filter, top, skip, tags, expandApiVersionSet).then((result) => {
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/apimanagement/arm-apimanagement/README.png)
