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
See https://github.com/Azure/ms-rest-browserauth to learn how to authenticate to Azure in the browser.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/arm-resourcehealth sample</title>
    <script src="node_modules/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/arm-resourcehealth/dist/arm-resourcehealth.js"></script>
    <script>
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
        const client = new Azure.ArmResourcehealth.MicrosoftResourceHealth(res.creds, subscriptionId);
        const filter = "testfilter";
        const expand = "testexpand";
        client.availabilityStatuses.listBySubscriptionId(filter, expand).then((result) => {
          console.log("The result is:");
          console.log(result);
        }).catch((err) => {
          console.log('An error occurred:');
          console.error(err);
        });
      });
    </script>
  </head>
  <body>
  </body>
</html>
```

# Related projects
 - [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)
