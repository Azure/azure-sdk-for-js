# Azure Azure Digital Twins Core client library for JavaScript

This package contains an isomorphic SDK for Azure Digital Twins API to provide access to the Azure Digital Twins service for managing twins, models, relationships, etc.

## Getting started

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/digital-twins-core
```

### How to use

#### nodejs - Authentication, client creation and list digitalTwinModels as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```bash
npm install @azure/ms-rest-nodeauth
```

##### Sample code

```typescript
import * as coreHttp from "@azure/core-http";
import * as coreArm from "@azure/core-arm";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import {
  AzureDigitalTwinsAPI,
  AzureDigitalTwinsAPIModels,
  AzureDigitalTwinsAPIMappers
} from "@azure/digital-twins-core";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];
msRestNodeAuth
  .interactiveLogin()
  .then((creds) => {
    const client = new AzureDigitalTwinsAPI(creds, subscriptionId);
    const dependenciesFor = ["testdependenciesFor"];
    const includeModelDefinition = true;
    const maxItemCount = 1;
    client.digitalTwinModels
      .list(dependenciesFor, includeModelDefinition, maxItemCount)
      .then((result) => {
        console.log("The result is:");
        console.log(result);
      });
  }
  .catch((err) => {
    console.error(err);
  })
```

#### browser - Authentication, client creation and list digitalTwinModels as an example written in JavaScript.

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
    <title>@azure/digital-twins-core sample</title>
    <script src="node_modules/@azure/core-http/dist/coreHttp.browser.js"></script>
    <script src="node_modules/@azure/core-arm/dist/coreArm.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/digital-twins-core/dist/digital-twins-core.js"></script>
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
        const client = new Azure.Digitaltwins.AzureDigitalTwinsAPI(res.creds, subscriptionId);
        const dependenciesFor = ["testdependenciesFor"];
        const includeModelDefinition = true;
        const maxItemCount = 1;
        client.digitalTwinModels
          .list(dependenciesFor, includeModelDefinition, maxItemCount)
          .then((result) => {
            console.log("The result is:");
            console.log(result);
          })
          .catch((err) => {
            console.log("An error occurred:");
            console.error(err);
          });
      });
    </script>
  </head>
  <body></body>
</html
```

## Key concepts

Azure Digital Twins Preview is an Azure IoT service that creates comprehensive models of the physical environment. It can create spatial intelligence graphs to model the relationships and interactions between people, spaces, and devices.
You can learn more about Azure Digital Twins by visiting [Azure Digital Twins Documentation](https://docs.microsoft.com/azure/digital-twins/)

## Examples

Please take a look at the Readme file in
[samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/digitaltwins/digital-twins-core/samples)
directory for detailed examples on how to use this library.

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/digitaltwins/digital-twins-core/samples)
directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)
  ![Impressions](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/digitaltwins/digital-twins-core/README.md)
