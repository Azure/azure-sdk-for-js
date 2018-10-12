# Azure AzureDeploymentManager SDK for JavaScript
This package contains an isomorphic SDK for AzureDeploymentManager.

## Currently supported environments
- Node.js version 6.x.x or higher
- Browser JavaScript

## How to Install
```
npm install @azure/arm-deploymentmanager
```


## How to use

### nodejs - Authentication, client creation and get serviceTopologies as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import * as msRestAzure from "ms-rest-azure-js";
import * as msRestNodeAuth from "ms-rest-nodeauth";
import { AzureDeploymentManager, AzureDeploymentManagerModels, AzureDeploymentManagerMappers } from "@azure/arm-deploymentmanager";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new AzureDeploymentManager(creds, subscriptionId);
  const resourceGroupName = "testresourceGroupName";
  const serviceTopologyName = "testserviceTopologyName";
  client.serviceTopologies.get(resourceGroupName, serviceTopologyName).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and get serviceTopologies as an example written in JavaScript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/arm-deploymentmanager sample</title>
    <script src="node_modules/ms-rest-js/master/msRestBundle.js"></script>
    <script src="node_modules/ms-rest-azure-js/master/msRestAzureBundle.js"></script>
    <script src="node_modules/@azure/arm-deploymentmanager/azureDeploymentManagerBundle.js"></script>
    <script>
      const subscriptionId = "<Subscription_Id>";
      const token = "<access_token>";
      const creds = new msRest.TokenCredentials(token);
      const client = new AzureDeploymentManager(creds, undefined, subscriptionId);
      const resourceGroupName = "testresourceGroupName";
      const serviceTopologyName = "testserviceTopologyName";
      client.serviceTopologies.get(resourceGroupName, serviceTopologyName).then((result) => {
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
