## Azure ComputeManagementClient SDK for JavaScript

This package contains an isomorphic SDK (runs both in node.js and in browsers) for ComputeManagementClient.

* [Learn more about Azure Compute](https://azure.microsoft.com/en-us/product-categories/compute/)
* [Reference documentation](https://docs.microsoft.com/en-us/javascript/api/@azure/arm-compute/?view=azure-node-latest)

### Currently supported environments

- Node.js version 8.x.x or higher
- Browser JavaScript

### How to install 

To use this SDK in your project, you will need to install two packages.
- `@azure/arm-compute` that contains the client.
- `@azure/identity` that contains the **latest authentication**. You can select from several different credential methods to authenticate the client using Azure Active Directory.

Install both packages using the following command.

```bash
npm install @azure/arm-compute @azure/identity
```

### How to use

1. Select an authentication credential method.
1. Complete any requirements for the authentication credential method.
1. Run the sample code below associated with that authentication credential method. 

#### Select an authentication credential method

There are [multiple credentials available](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/README.md#azure-identity-client-library-for-javascript) in the `@azure/identity` package to suit your different authentication needs. We recommend the following authentication credential methods, based on your task:

|Authentication|Requires|Task|
|--|--|--|
|[DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/README.md#defaultazurecredential)|Requires setup.|Production-level authentication working both locally and in your cloud environment.This is the **recommended** authentication method. It is necessary to create an Azure App Registration in the portal for your web application first. [Create an Azure App Registration](https://docs.microsoft.com/en-us/azure/active-directory/develop/app-objects-and-service-principals#application-registration).|
|Interactive Browser|Requires setup.|Production-level client authentication working both locally and in your cloud environment. It is necessary to create an Azure App Registration in the portal for your web application first. [Create an Azure App Registration](https://docs.microsoft.com/en-us/azure/active-directory/develop/app-objects-and-service-principals#application-registration).|
|Interactive device code login|Requires browser authentication.|Quickly try out code with minimal authentication setup,works with two-factor authentication.|
|Username/Password|Requires Azure account username and password.|Quickly try out code with minimal authentication setup. No browser authentication.| 

#### Node.js Sample code with DefaultAzureCredential

```javascript

// Required dependencies
const { DefaultAzureCredential } = require("@azure/identity");
const { ComputeManagementClient } = require("@azure/arm-compute");

// Required subscription NAME or ID
const subscriptionId = process.env["REPLACE-WITH-YOUR-AZURE_SUBSCRIPTION-NAME-OR-ID"];

// Create credentials using the `@azure/identity` package. Requires setup before use.
const creds = new DefaultAzureCredential();

// Create Compute Management Client
const client = new ComputeManagementClient(creds, subscriptionId);

// Required Client information
const resourceGroupName = "REPLACE-WITH-YOUR-RESOURCE-GROUP-NAME";
const resourceName = "REPLACE-WITH-YOUR-COMPUTE-RESOURCE-NAME";

// Call Client Operations List method
client.operations.list(resourceGroupName, resourceName).then((result) => {
  console.log("The result is:");
  console.log(result);
}).catch((err) => {
  console.log("An error occurred:");
  console.error(err);
});
```

#### Browser Sample code with InteractiveBrowserCredential

In browser applications, we recommend using the `InteractiveBrowserCredential` that interactively authenticates using the default system browser.

- index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/arm-compute sample</title>
    <script src="node_modules/@azure/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/@azure/identity/dist/index.js"></script>
    <script src="node_modules/@azure/arm-compute/dist/arm-compute.js"></script>
    <script type="text/javascript">

      // Required subscription NAME or ID
      const subscriptionId = "REPLACE-WITH-YOUR-AZURE_SUBSCRIPTION-NAME-OR-ID";

      // Required credentials, using the `@azure/identity` package.
      const credential = new InteractiveBrowserCredential(
      {
        clientId: "REPLACE-WITH-YOUR-CLIENT-ID-FROM-YOUR-AZURE-APP-REGISTRATION",
        tenant: "REPLACE-WITH-TENANT-FROM-YOUR-AZURE-ORGANIZATION"
      });

      // Create Compute Management Client
      const client = new Azure.ArmCompute.ComputeManagementClient(creds, subscriptionId);

      // Required Client information
      const resourceGroupName = "REPLACE-WITH-YOUR-RESOURCE-GROUP-NAME";
      const resourceName = "REPLACE-WITH-YOUR-COMPUTE-RESOURCE-NAME";

      // Call Client Operations List method
      client.operations.list(resourceGroupName, resourceName).then((result) => {
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

#### Node.js Sample code with Interactive device code login

fill in this code sample

#### Node.js Sample code with Username and Password

fill in this code sample

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/compute/arm-compute/README.png)
