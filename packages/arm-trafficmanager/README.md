# Azure TrafficManagerManagementClient SDK for JavaScript
This package contains an isomorphic SDK for TrafficManagerManagementClient.

## Currently supported environments
- Node.js version 6.x.x or higher
- Browser JavaScript

## How to Install
```
npm install arm-trafficmanager
```


## How to use

### nodejs - Authentication, client creation and get endpoints as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import * as msRestAzure from "ms-rest-azure-js";
import * as msRestNodeAuth from "ms-rest-nodeauth";
import { TrafficManagerManagementClient, TrafficManagerManagementModels, TrafficManagerManagementMappers } from "arm-trafficmanager";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new TrafficManagerManagementClient(creds, subscriptionId);
  const resourceGroupName = "testresourceGroupName";
  const profileName = "testprofileName";
  const endpointType = "testendpointType";
  const endpointName = "testendpointName";
  client.endpoints.get(resourceGroupName, profileName, endpointType, endpointName).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and get endpoints as an example written in JavaScript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>arm-trafficmanager sample</title>
    <script src="node_modules/ms-rest-js/master/msRestBundle.js"></script>
    <script src="node_modules/ms-rest-azure-js/master/msRestAzureBundle.js"></script>
    <script src="node_modules/arm-trafficmanager/trafficManagerManagementClientBundle.js"></script>
    <script>
      const subscriptionId = "<Subscription_Id>";
      const token = "<access_token>";
      const creds = new msRest.TokenCredentials(token);
      const client = new TrafficManagerManagementClient(creds, undefined, subscriptionId);
      const resourceGroupName = "testresourceGroupName";
      const profileName = "testprofileName";
      const endpointType = "testendpointType";
      const endpointName = "testendpointName";
      client.endpoints.get(resourceGroupName, profileName, endpointType, endpointName).then((result) => {
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
