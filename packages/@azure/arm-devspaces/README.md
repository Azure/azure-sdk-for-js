# Azure DevSpacesManagementClient SDK for JavaScript
This package contains an isomorphic SDK for DevSpacesManagementClient.

## Currently supported environments
- Node.js version 6.x.x or higher
- Browser JavaScript

## How to Install
```
npm install @azure/arm-devspaces
```


## How to use

### nodejs - Authentication, client creation and get controllers as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import * as msRestAzure from "ms-rest-azure-js";
import * as msRestNodeAuth from "ms-rest-nodeauth";
import { DevSpacesManagementClient, DevSpacesManagementModels, DevSpacesManagementMappers } from "@azure/arm-devspaces";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new DevSpacesManagementClient(creds, subscriptionId);
  const resourceGroupName = "testresourceGroupName";
  const name = "testname";
  client.controllers.get(resourceGroupName, name).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and get controllers as an example written in JavaScript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/arm-devspaces sample</title>
    <script src="node_modules/ms-rest-js/master/msRestBundle.js"></script>
    <script src="node_modules/ms-rest-azure-js/master/msRestAzureBundle.js"></script>
    <script src="node_modules/@azure/arm-devspaces/devSpacesManagementClientBundle.js"></script>
    <script>
      const subscriptionId = "<Subscription_Id>";
      const token = "<access_token>";
      const creds = new msRest.TokenCredentials(token);
      const client = new DevSpacesManagementClient(creds, undefined, subscriptionId);
      const resourceGroupName = "testresourceGroupName";
      const name = "testname";
      client.controllers.get(resourceGroupName, name).then((result) => {
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
