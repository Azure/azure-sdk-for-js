# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                           | **Description**                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [federatedIdentityCredentialsCreateOrUpdateSample.ts][federatedidentitycredentialscreateorupdatesample] | Create or update a federated identity credential under the specified user assigned identity. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/stable/2024-11-30/examples/FederatedIdentityCredentialCreate.json |
| [federatedIdentityCredentialsDeleteSample.ts][federatedidentitycredentialsdeletesample]                 | Deletes the federated identity credential. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/stable/2024-11-30/examples/FederatedIdentityCredentialDelete.json                                                   |
| [federatedIdentityCredentialsGetSample.ts][federatedidentitycredentialsgetsample]                       | Gets the federated identity credential. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/stable/2024-11-30/examples/FederatedIdentityCredentialGet.json                                                         |
| [federatedIdentityCredentialsListSample.ts][federatedidentitycredentialslistsample]                     | Lists all the federated identity credentials under the specified user assigned identity. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/stable/2024-11-30/examples/FederatedIdentityCredentialList.json       |
| [operationsListSample.ts][operationslistsample]                                                         | Lists available operations for the Microsoft.ManagedIdentity provider x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/stable/2024-11-30/examples/MsiOperationsList.json                                        |
| [systemAssignedIdentitiesGetByScopeSample.ts][systemassignedidentitiesgetbyscopesample]                 | Gets the systemAssignedIdentity available under the specified RP scope. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/stable/2024-11-30/examples/SystemAssignedIdentityGet.json                              |
| [userAssignedIdentitiesCreateOrUpdateSample.ts][userassignedidentitiescreateorupdatesample]             | Create or update an identity in the specified subscription and resource group. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/stable/2024-11-30/examples/IdentityCreate.json                                  |
| [userAssignedIdentitiesDeleteSample.ts][userassignedidentitiesdeletesample]                             | Deletes the identity. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/stable/2024-11-30/examples/IdentityDelete.json                                                                                           |
| [userAssignedIdentitiesGetSample.ts][userassignedidentitiesgetsample]                                   | Gets the identity. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/stable/2024-11-30/examples/IdentityGet.json                                                                                                 |
| [userAssignedIdentitiesListByResourceGroupSample.ts][userassignedidentitieslistbyresourcegroupsample]   | Lists all the userAssignedIdentities available under the specified ResourceGroup. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/stable/2024-11-30/examples/IdentityListByResourceGroup.json                  |
| [userAssignedIdentitiesListBySubscriptionSample.ts][userassignedidentitieslistbysubscriptionsample]     | Lists all the userAssignedIdentities available under the specified subscription. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/stable/2024-11-30/examples/IdentityListBySubscription.json                    |
| [userAssignedIdentitiesUpdateSample.ts][userassignedidentitiesupdatesample]                             | Update an identity in the specified subscription and resource group. x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/stable/2024-11-30/examples/IdentityUpdate.json                                            |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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
node dist/federatedIdentityCredentialsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env MSI_SUBSCRIPTION_ID="<msi subscription id>" MSI_RESOURCE_GROUP="<msi resource group>" node dist/federatedIdentityCredentialsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[federatedidentitycredentialscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2/typescript/src/federatedIdentityCredentialsCreateOrUpdateSample.ts
[federatedidentitycredentialsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2/typescript/src/federatedIdentityCredentialsDeleteSample.ts
[federatedidentitycredentialsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2/typescript/src/federatedIdentityCredentialsGetSample.ts
[federatedidentitycredentialslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2/typescript/src/federatedIdentityCredentialsListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2/typescript/src/operationsListSample.ts
[systemassignedidentitiesgetbyscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2/typescript/src/systemAssignedIdentitiesGetByScopeSample.ts
[userassignedidentitiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2/typescript/src/userAssignedIdentitiesCreateOrUpdateSample.ts
[userassignedidentitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2/typescript/src/userAssignedIdentitiesDeleteSample.ts
[userassignedidentitiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2/typescript/src/userAssignedIdentitiesGetSample.ts
[userassignedidentitieslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2/typescript/src/userAssignedIdentitiesListByResourceGroupSample.ts
[userassignedidentitieslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2/typescript/src/userAssignedIdentitiesListBySubscriptionSample.ts
[userassignedidentitiesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v2/typescript/src/userAssignedIdentitiesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-msi?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/msi/arm-msi/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
