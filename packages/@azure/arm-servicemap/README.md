# Azure ServicemapManagementClient SDK for JavaScript
This package contains an isomorphic SDK for ServicemapManagementClient.

## Currently supported environments
- Node.js version 6.x.x or higher
- Browser JavaScript

## How to Install
```
npm install @azure/arm-servicemap
```


## How to use

### nodejs - Authentication, client creation and listByWorkspace machines as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import * as msRestAzure from "ms-rest-azure-js";
import * as msRestNodeAuth from "ms-rest-nodeauth";
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

### browser - Authentication, client creation and listByWorkspace machines as an example written in JavaScript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/arm-servicemap sample</title>
    <script src="node_modules/ms-rest-js/master/msRestBundle.js"></script>
    <script src="node_modules/ms-rest-azure-js/master/msRestAzureBundle.js"></script>
    <script src="node_modules/@azure/arm-servicemap/servicemapManagementClientBundle.js"></script>
    <script>
      const subscriptionId = "<Subscription_Id>";
      const token = "<access_token>";
      const creds = new msRest.TokenCredentials(token);
      const client = new ServicemapManagementClient(creds, undefined, subscriptionId);
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
