# Azure StorageManagementClient SDK for JavaScript

This package contains an isomorphic SDK for StorageManagementClient.

> Please note, this package is deprecated and not functional as it uses an older version of the Javascript SDK generator. As of April 2022, you can instead use [@azure/arm-storage-profile-2020-09-01-hybrid](https://www.npmjs.com/package/@azure/arm-storage-profile-2020-09-01-hybrid).

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

### How to Install

```bash
npm install @azure/arm-storage-profile-2019-03-01-hybrid
```

### How to use

#### nodejs - Authentication, client creation and list operations as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```bash
npm install @azure/ms-rest-nodeauth
```

##### Sample code

```typescript
import * as msRest from "@azure/ms-rest-js";
import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import {
  StorageManagementClient,
  StorageManagementModels,
  StorageManagementMappers,
} from "@azure/arm-storage-profile-2019-03-01-hybrid";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth
  .interactiveLogin()
  .then((creds) => {
    const client = new StorageManagementClient(creds, subscriptionId);
    client.operations.list().then((result) => {
      console.log("The result is:");
      console.log(result);
    });
  })
  .catch((err) => {
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
    <title>@azure/arm-storage-profile-2019-03-01-hybrid sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/arm-storage-profile-2019-03-01-hybrid/dist/arm-storage-profile-2019-03-01-hybrid.js"></script>
    <script type="text/javascript">
      const subscriptionId = "<Subscription_Id>";
      const authManager = new msAuth.AuthManager({
        clientId: "<client id for your Azure AD app>",
        tenant: "<optional tenant for your organization>",
      });
      authManager.finalizeLogin().then((res) => {
        if (!res.isLoggedIn) {
          // may cause redirects
          authManager.login();
        }
        const client = new Azure.ArmStorageProfile20190301Hybrid.StorageManagementClient(
          res.creds,
          subscriptionId
        );
        client.operations
          .list()
          .then((result) => {
            console.log("The result is:");
            console.log(result);
          })
          .catch((err) => {
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fstorage%2Farm-storage-profile-2019-03-01-hybrid%2FREADME.png)
