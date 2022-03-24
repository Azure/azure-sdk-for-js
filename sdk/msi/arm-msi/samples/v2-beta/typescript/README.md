# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                 | **Description**                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.ts][operationslistsample]                                                               | Lists available operations for the Microsoft.ManagedIdentity provider x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/preview/2021-09-30-preview/examples/MsiOperationsList.json                       |
| [systemAssignedIdentitiesGetByScopeSample.ts][systemassignedidentitiesgetbyscopesample]                       | Gets the systemAssignedIdentity available under the specified RP scope. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/preview/2021-09-30-preview/examples/SystemAssignedIdentityGet.json             |
| [userAssignedIdentitiesCreateOrUpdateSample.ts][userassignedidentitiescreateorupdatesample]                   | Create or update an identity in the specified subscription and resource group. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/preview/2021-09-30-preview/examples/IdentityCreate.json                 |
| [userAssignedIdentitiesDeleteSample.ts][userassignedidentitiesdeletesample]                                   | Deletes the identity. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/preview/2021-09-30-preview/examples/IdentityDelete.json                                                                          |
| [userAssignedIdentitiesGetSample.ts][userassignedidentitiesgetsample]                                         | Gets the identity. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/preview/2021-09-30-preview/examples/IdentityGet.json                                                                                |
| [userAssignedIdentitiesListAssociatedResourcesSample.ts][userassignedidentitieslistassociatedresourcessample] | Lists the associated resources for this identity. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/preview/2021-09-30-preview/examples/IdentityListAssociatedResources.json                             |
| [userAssignedIdentitiesListByResourceGroupSample.ts][userassignedidentitieslistbyresourcegroupsample]         | Lists all the userAssignedIdentities available under the specified ResourceGroup. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/preview/2021-09-30-preview/examples/IdentityListByResourceGroup.json |
| [userAssignedIdentitiesListBySubscriptionSample.ts][userassignedidentitieslistbysubscriptionsample]           | Lists all the userAssignedIdentities available under the specified subscription. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/preview/2021-09-30-preview/examples/IdentityListBySubscription.json   |
| [userAssignedIdentitiesUpdateSample.ts][userassignedidentitiesupdatesample]                                   | Update an identity in the specified subscription and resource group. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/preview/2021-09-30-preview/examples/IdentityUpdate.json                           |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/operationsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2-beta/typescript/src/operationsListSample.ts
[systemassignedidentitiesgetbyscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2-beta/typescript/src/systemAssignedIdentitiesGetByScopeSample.ts
[userassignedidentitiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2-beta/typescript/src/userAssignedIdentitiesCreateOrUpdateSample.ts
[userassignedidentitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2-beta/typescript/src/userAssignedIdentitiesDeleteSample.ts
[userassignedidentitiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2-beta/typescript/src/userAssignedIdentitiesGetSample.ts
[userassignedidentitieslistassociatedresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2-beta/typescript/src/userAssignedIdentitiesListAssociatedResourcesSample.ts
[userassignedidentitieslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2-beta/typescript/src/userAssignedIdentitiesListByResourceGroupSample.ts
[userassignedidentitieslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2-beta/typescript/src/userAssignedIdentitiesListBySubscriptionSample.ts
[userassignedidentitiesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2-beta/typescript/src/userAssignedIdentitiesUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-msi?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/msi/arm-msi/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
