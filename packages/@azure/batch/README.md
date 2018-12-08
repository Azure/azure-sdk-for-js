## Azure BatchServiceClient SDK for JavaScript

This package contains an isomorphic SDK for BatchServiceClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/batch
```

### How to use

#### nodejs - Authentication, client creation and list application as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```bash
npm install @azure/ms-rest-nodeauth
```

##### Sample code

```typescript
import * as msRest from "@azure/ms-rest-js";
import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
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

#### browser - Authentication, client creation and list application as an example written in JavaScript.

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
    <title>@azure/batch sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/batch/dist/batch.js"></script>
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
        const client = new Azure.Batch.BatchServiceClient(res.creds, subscriptionId);
        const maxResults = 1;
        const timeout = 1;
        const clientRequestId = ec7b1657-199d-4d8a-bbb2-89a11a42e02a;
        const returnClientRequestId = true;
        const ocpDate = new Date().toUTCString();
        client.application.list(maxResults, timeout, clientRequestId, returnClientRequestId, ocpDate).then((result) => {
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
