# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                                 | **Description**                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.js][operationslistsample]                                                               | Lists available operations for the Microsoft.ManagedIdentity provider x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/preview/2021-09-30-preview/examples/MsiOperationsList.json                       |
| [systemAssignedIdentitiesGetByScopeSample.js][systemassignedidentitiesgetbyscopesample]                       | Gets the systemAssignedIdentity available under the specified RP scope. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/preview/2021-09-30-preview/examples/SystemAssignedIdentityGet.json             |
| [userAssignedIdentitiesCreateOrUpdateSample.js][userassignedidentitiescreateorupdatesample]                   | Create or update an identity in the specified subscription and resource group. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/preview/2021-09-30-preview/examples/IdentityCreate.json                 |
| [userAssignedIdentitiesDeleteSample.js][userassignedidentitiesdeletesample]                                   | Deletes the identity. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/preview/2021-09-30-preview/examples/IdentityDelete.json                                                                          |
| [userAssignedIdentitiesGetSample.js][userassignedidentitiesgetsample]                                         | Gets the identity. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/preview/2021-09-30-preview/examples/IdentityGet.json                                                                                |
| [userAssignedIdentitiesListAssociatedResourcesSample.js][userassignedidentitieslistassociatedresourcessample] | Lists the associated resources for this identity. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/preview/2021-09-30-preview/examples/IdentityListAssociatedResources.json                             |
| [userAssignedIdentitiesListByResourceGroupSample.js][userassignedidentitieslistbyresourcegroupsample]         | Lists all the userAssignedIdentities available under the specified ResourceGroup. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/preview/2021-09-30-preview/examples/IdentityListByResourceGroup.json |
| [userAssignedIdentitiesListBySubscriptionSample.js][userassignedidentitieslistbysubscriptionsample]           | Lists all the userAssignedIdentities available under the specified subscription. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/preview/2021-09-30-preview/examples/IdentityListBySubscription.json   |
| [userAssignedIdentitiesUpdateSample.js][userassignedidentitiesupdatesample]                                   | Update an identity in the specified subscription and resource group. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/preview/2021-09-30-preview/examples/IdentityUpdate.json                           |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node operationsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2-beta/javascript/operationsListSample.js
[systemassignedidentitiesgetbyscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2-beta/javascript/systemAssignedIdentitiesGetByScopeSample.js
[userassignedidentitiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2-beta/javascript/userAssignedIdentitiesCreateOrUpdateSample.js
[userassignedidentitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2-beta/javascript/userAssignedIdentitiesDeleteSample.js
[userassignedidentitiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2-beta/javascript/userAssignedIdentitiesGetSample.js
[userassignedidentitieslistassociatedresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2-beta/javascript/userAssignedIdentitiesListAssociatedResourcesSample.js
[userassignedidentitieslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2-beta/javascript/userAssignedIdentitiesListByResourceGroupSample.js
[userassignedidentitieslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2-beta/javascript/userAssignedIdentitiesListBySubscriptionSample.js
[userassignedidentitiesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2-beta/javascript/userAssignedIdentitiesUpdateSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-msi?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/msi/arm-msi/README.md
