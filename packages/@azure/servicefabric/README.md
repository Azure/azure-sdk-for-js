# An isomorphic javascript sdk for - ServiceFabricClient
This project provides an isomorphic javascript package. Right now it supports:
- node.js version 6.x.x or higher
- browser javascript

## How to Install

- nodejs
```
npm install @azure/servicefabric
```
- browser
```html
<script type="text/javascript" src="@azure/servicefabric/serviceFabricClientBundle.js"></script>
```

## How to use

### nodejs - Authentication, client creation and getClusterManifest  as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import { ServiceFabricClient, ServiceFabricModels, ServiceFabricMappers } from "@azure/servicefabric";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

const token = "<access_token>";
const creds = new msRest.TokenCredentials(token);
const client = new ServiceFabricClient(creds, subscriptionId);
const timeout = 1;
client.getClusterManifest(timeout).then((result) => {
  console.log("The result is:");
  console.log(result);
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and getClusterManifest  as an example written in javascript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/servicefabric sample</title>
    <script type="text/javascript" src="./node_modules/ms-rest-js/msRestBundle.js"></script>
    <script type="text/javascript" src="./serviceFabricClientBundle.js"></script>
    <script type="text/javascript">
      const subscriptionId = "<Subscription_Id>";
      const token = "<access_token>";
      const creds = new msRest.TokenCredentials(token);
      const client = new ServiceFabricClient(creds, subscriptionId);
      const timeout = 1;
      client.getClusterManifest(timeout).then((result) => {
        console.log("The result is:");
        console.log(result);
      }).catch((err) => {
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
