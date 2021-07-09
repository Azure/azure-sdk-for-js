## Azure ResourceManagementClient SDK for JavaScript

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for ResourceManagementClient.

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

### Prerequisites

You must have an [Azure subscription](https://azure.microsoft.com/free/).

### How to install

To use this SDK in your project, you will need to install two packages.
- `@azure/arm-resources` that contains the client.
- `@azure/identity` that provides different mechanisms for the client to authenticate your requests using Azure Active Directory.

Install both packages using the below command:
```bash
npm install --save @azure/arm-resources @azure/identity
```

> **Note**: You may have used either `@azure/ms-rest-nodeauth` or `@azure/ms-rest-browserauth` in the past. These packages are in maintenance mode receiving critical bug fixes, but no new features.
If you are on a [Node.js that has LTS status](https://nodejs.org/about/releases/), or are writing a client side browser application, we strongly encourage you to upgrade to `@azure/identity` which uses the latest versions of Azure Active Directory and MSAL APIs and provides more authentication options.

### How to use

- If you are writing a client side browser application,
  - Follow the instructions in the section on Authenticating client side browser applications in [Azure Identity examples](https://aka.ms/azsdk/js/identity/examples) to register your application in the Microsoft identity platform and set the right permissions.
  - Copy the client ID and tenant ID from the Overview section of your app registration in Azure portal and use it in the browser sample below.
- If you are writing a server side application,
  - [Select a credential from `@azure/identity` based on the authentication method of your choice](https://aka.ms/azsdk/js/identity/examples)
  - Complete the set up steps required by the credential if any.
  - Use the credential you picked in the place of `DefaultAzureCredential` in the Node.js sample below.

In the below samples, we pass the credential and the Azure subscription id to instantiate the client.
Once the client is created, explore the operations on it either in your favorite editor or in our [API reference documentation](https://docs.microsoft.com/javascript/api) to get started.

#### nodejs - Authentication, client creation, and list operations as an example written in JavaScript.

##### Sample code

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { ResourceManagementClient } = require("@azure/arm-resources");
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

// Use `DefaultAzureCredential` or any other credential of your choice based on https://aka.ms/azsdk/js/identity/examples
// Please note that you can also use credentials from the `@azure/ms-rest-nodeauth` package instead.
const creds = new DefaultAzureCredential();
const client = new ResourceManagementClient(creds, subscriptionId);

client.operations.list().then((result) => {
  console.log("The result is:");
  console.log(result);
}).catch((err) => {
  console.log("An error occurred:");
  console.error(err);
});
```

#### browser - Authentication, client creation, and list operations as an example written in JavaScript.

In browser applications, we recommend using the `InteractiveBrowserCredential` that interactively authenticates using the default system browser.
  - See [Single-page application: App registration guide](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration) to configure your app registration for the browser.
  - Note down the client Id from the previous step and use it in the browser sample below.

##### Sample code

- index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/arm-resources sample</title>
    <script src="node_modules/@azure/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/@azure/identity/dist/index.js"></script>
    <script src="node_modules/@azure/arm-resources/dist/arm-resources.js"></script>
    <script type="text/javascript">
      const subscriptionId = "<Subscription_Id>";
      // Create credentials using the `@azure/identity` package.
      // Please note that you can also use credentials from the `@azure/ms-rest-browserauth` package instead.
      const credential = new InteractiveBrowserCredential(
      {
        clientId: "<client id for your Azure AD app>",
        tenantId: "<optional tenant for your organization>"
      });
      const client = new Azure.ArmResources.ResourceManagementClient(creds, subscriptionId);
      client.operations.list().then((result) => {
        console.log("The result is:");
        console.log(result);
      }).catch((err) => {
        console.log("An error occurred:");
        console.error(err);
      });
    </script>
  </head>
  <body></body>
</html>
```

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/.\sdk\resources\arm-resources\/README.png)
