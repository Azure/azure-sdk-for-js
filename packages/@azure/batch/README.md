# Azure BatchServiceClient SDK for JavaScript
This package contains an isomorphic SDK for BatchServiceClient.

## Currently supported environments
- Node.js version 6.x.x or higher
- Browser JavaScript

## How to Install
```
npm install @azure/batch
```


## How to use

### nodejs - Authentication, client creation and list application as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import * as msRestAzure from "ms-rest-azure-js";
import * as msRestNodeAuth from "ms-rest-nodeauth";
import { BatchServiceClient, BatchServiceModels, BatchServiceMappers } from "@azure/batch";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new BatchServiceClient(creds, subscriptionId);
  const maxResults = 1;
  const timeout = 1;
  const clientRequestId = ec7b1657-199d-4d8a-bbb2-89a11a42e02a;
  const returnClientRequestId = true;
  const ocpDate = new Date().toUTCString();
  client.application.list(maxResults, timeout, clientRequestId, returnClientRequestId, ocpDate).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and list application as an example written in JavaScript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/batch sample</title>
    <script src="node_modules/ms-rest-js/master/msRestBundle.js"></script>
    <script src="node_modules/ms-rest-azure-js/master/msRestAzureBundle.js"></script>
    <script src="node_modules/@azure/batch/batchServiceClientBundle.js"></script>
    <script>
      const subscriptionId = "<Subscription_Id>";
      const token = "<access_token>";
      const creds = new msRest.TokenCredentials(token);
      const client = new BatchServiceClient(creds, undefined, subscriptionId);
      const maxResults = 1;
      const timeout = 1;
      const clientRequestId = ec7b1657-199d-4d8a-bbb2-89a11a42e02a;
      const returnClientRequestId = true;
      const ocpDate = new Date().toUTCString();
      client.application.list(maxResults, timeout, clientRequestId, returnClientRequestId, ocpDate).then((result) => {
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
