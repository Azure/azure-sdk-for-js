# Azure DataLakeStoreAccountManagementClient SDK for JavaScript
This package contains an isomorphic SDK for DataLakeStoreAccountManagementClient.

## Currently supported environments
- Node.js version 6.x.x or higher
- Browser JavaScript

## How to Install
```
npm install @azure/arm-datalake-store
```


## How to use

### nodejs - Authentication, client creation and list accounts as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import * as msRestAzure from "ms-rest-azure-js";
import * as msRestNodeAuth from "ms-rest-nodeauth";
import { DataLakeStoreAccountManagementClient, DataLakeStoreAccountManagementModels, DataLakeStoreAccountManagementMappers } from "@azure/arm-datalake-store";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new DataLakeStoreAccountManagementClient(creds, subscriptionId);
  const filter = "testfilter";
  const top = 1;
  const skip = 1;
  const select = "testselect";
  const orderby = "testorderby";
  const count = true;
  client.accounts.list(filter, top, skip, select, orderby, count).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and list accounts as an example written in JavaScript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/arm-datalake-store sample</title>
    <script src="node_modules/ms-rest-js/master/msRestBundle.js"></script>
    <script src="node_modules/ms-rest-azure-js/master/msRestAzureBundle.js"></script>
    <script src="node_modules/@azure/arm-datalake-store/dataLakeStoreAccountManagementClientBundle.js"></script>
    <script>
      const subscriptionId = "<Subscription_Id>";
      const token = "<access_token>";
      const creds = new msRest.TokenCredentials(token);
      const client = new DataLakeStoreAccountManagementClient(creds, undefined, subscriptionId);
      const filter = "testfilter";
      const top = 1;
      const skip = 1;
      const select = "testselect";
      const orderby = "testorderby";
      const count = true;
      client.accounts.list(filter, top, skip, select, orderby, count).then((result) => {
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
