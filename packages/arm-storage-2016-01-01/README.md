# Azure StorageManagementClient SDK for JavaScript
This package contains **API version 2016-01-01** of StorageManagementClient.

For other API versions, see https://npmjs.com/@azure/arm-storage.

## Currently supported environments
- Node.js version 6.x.x or higher
- Browser JavaScript

## How to Install
```
npm install @azure/arm-storage-2016-01-01
```


## How to use

### nodejs - Authentication, client creation and getProperties storageAccounts as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import * as msRestAzure from "ms-rest-azure-js";
import * as msRestNodeAuth from "ms-rest-nodeauth";
import { StorageManagementClient, StorageManagementModels, StorageManagementMappers } from "@azure/arm-storage-2016-01-01";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new StorageManagementClient(creds, subscriptionId);
  const resourceGroupName = "testresourceGroupName";
  const accountName = "testaccountName";
  client.storageAccounts.getProperties(resourceGroupName, accountName).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and getProperties storageAccounts as an example written in JavaScript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/arm-storage-2016-01-01 sample</title>
    <script src="node_modules/ms-rest-js/master/msRestBundle.js"></script>
    <script src="node_modules/ms-rest-azure-js/master/msRestAzureBundle.js"></script>
    <script src="node_modules/@azure/arm-storage-2016-01-01/storageManagementClientBundle.js"></script>
    <script>
      const subscriptionId = "<Subscription_Id>";
      const token = "<access_token>";
      const creds = new msRest.TokenCredentials(token);
      const client = new StorageManagementClient(creds, undefined, subscriptionId);
      const resourceGroupName = "testresourceGroupName";
      const accountName = "testaccountName";
      client.storageAccounts.getProperties(resourceGroupName, accountName).then((result) => {
        console.log("The result is:");
        console.log(result);
      }).catch((err) => {
        console.log('An error ocurred:');
        console.error(err);
      });
    </script>
  </head>
  <body>
  </body>
</html>
```

# Related projects
 - [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)
