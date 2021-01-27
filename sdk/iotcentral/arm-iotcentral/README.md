## Azure IotCentralClient SDK for JavaScript

This package contains an isomorphic SDK (runs both in node.js and in browsers) for managing Azure Iot Central resources.

### Currently supported environments

- Node.js version 8.x.x or higher
- Browser JavaScript

### How to Install

To use this SDK in your project, you will need to install two packages.

- `@azure/arm-iotcentral` that contains the client to manage Azure Iot Central resources.
- `@azure/identity` that contains different credentials for you to authenticate the client using Azure Active Directory.

Install both packages using the below commands.
Alternatively, you can add these to the dependencies section in your package.json and then run `npm install`.

```bash
npm install @azure/arm-keyvault
npm install @azure/identity
```

Please note that while the credentials from the older `@azure/ms-rest-nodeauth` and `@azure/ms-rest-browserauth` packages are still supported, these packages are in maintainence mode receiving critical bug fixes, but no new features.
We strongly encourage you to use the credentials from `@azure/identity` where the latest versions of Azure Active Directory and MSAL APIs are used and more authentication options are provided.

### How to use

There are multiple credentials available in the `@azure/identity` package to suit your different needs.
Read about them in detail in [readme for @azure/identity package](https://www.npmjs.com/package/@azure/identity).
To get started you can use the [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/README.md#defaultazurecredential) which tries different credentials internally until one of them succeeds.

Most of the credentials would require you to register to [create an Azure App Registration](https://docs.microsoft.com/en-us/azure/active-directory/develop/app-objects-and-service-principals#application-registration) first.

#### nodejs - client creation and get apps as an example written in JavaScript.

##### Sample code

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { IotCentralClient } = require("@azure/arm-iotcentral");

const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];
const creds = new DefaultAzureCredential();
const client = new IotCentralClient(creds, subscriptionId);
const resourceGroupName = "testresourceGroupName";
const resourceName = "testresourceName";

client.apps
  .get(resourceGroupName, resourceName)
  .then((result) => {
    console.log("The result is:");
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });
```

#### browser - Authentication, client creation and get apps as an example written in JavaScript.

In browser applications, we recommend using the `InteractiveBrowserCredential` that interactively authenticates using the default system browser.
It is necessary to [create an Azure App Registration](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration) in the portal for your web application first.

##### Sample code

- index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/arm-iotcentral sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/arm-iotcentral/dist/arm-iotcentral.js"></script>
    <script type="text/javascript">
      const subscriptionId = "<Subscription_Id>";
      const authManager = new msAuth.AuthManager({
        clientId: "<client id for your Azure AD app>",
        tenant: "<optional tenant for your organization>",
      });
      authManager.finalizeLogin().then((res) => {
        if (!res.isLoggedIn) {
          // may cause redirects
          authManager.login();
        }
        const client = new Azure.ArmIotcentral.IotCentralClient(res.creds, subscriptionId);
        const resourceGroupName = "testresourceGroupName";
        const resourceName = "testresourceName";
        client.apps
          .get(resourceGroupName, resourceName)
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
</html>
```

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/iotcentral/arm-iotcentral/README.png)
