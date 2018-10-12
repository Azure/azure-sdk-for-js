# Azure MicrosoftResourceHealth SDK for JavaScript
This package contains an isomorphic SDK for MicrosoftResourceHealth.

## Currently supported environments
- Node.js version 6.x.x or higher
- Browser JavaScript

## How to Install
```
npm install @azure/arm-resourcehealth
```


## How to use

### nodejs - Authentication, client creation and listBySubscriptionId availabilityStatuses as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import * as msRestAzure from "ms-rest-azure-js";
import * as msRestNodeAuth from "ms-rest-nodeauth";
import { MicrosoftResourceHealth, MicrosoftResourceHealthModels, MicrosoftResourceHealthMappers } from "@azure/arm-resourcehealth";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new MicrosoftResourceHealth(creds, subscriptionId);
  const filter = "testfilter";
  const expand = "testexpand";
  client.availabilityStatuses.listBySubscriptionId(filter, expand).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and listBySubscriptionId availabilityStatuses as an example written in JavaScript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/arm-resourcehealth sample</title>
    <script src="node_modules/ms-rest-js/master/msRestBundle.js"></script>
    <script src="node_modules/ms-rest-azure-js/master/msRestAzureBundle.js"></script>
    <script src="node_modules/@azure/arm-resourcehealth/microsoftResourceHealthBundle.js"></script>
    <script>
      const subscriptionId = "<Subscription_Id>";
      const token = "<access_token>";
      const creds = new msRest.TokenCredentials(token);
      const client = new MicrosoftResourceHealth(creds, undefined, subscriptionId);
      const filter = "testfilter";
      const expand = "testexpand";
      client.availabilityStatuses.listBySubscriptionId(filter, expand).then((result) => {
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
