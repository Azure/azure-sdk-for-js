# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [getOperationResultSample.ts][getoperationresultsample]                                       | Gets the operation result for a resource. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/GetOperationResult.json                                                                                                                                                                                                                                                  |
| [getOperationStatusSample.ts][getoperationstatussample]                                       | Gets the operation status for a resource. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/GetOperationStatus.json                                                                                                                                                                                                                                                  |
| [operationsListSample.ts][operationslistsample]                                               | Returns the list of available operations. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/ListOperations.json                                                                                                                                                                                                                                                      |
| [privateLinkResourcesGetSample.ts][privatelinkresourcesgetsample]                             | Returns a specified private link resource that need to be created for Backup and SiteRecovery x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/GetPrivateLinkResources.json                                                                                                                                                                                         |
| [privateLinkResourcesListSample.ts][privatelinkresourceslistsample]                           | Returns the list of private link resources that need to be created for Backup and SiteRecovery x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/ListPrivateLinkResources.json                                                                                                                                                                                       |
| [recoveryServicesCapabilitiesSample.ts][recoveryservicescapabilitiessample]                   | API to get details about capabilities provided by Microsoft.RecoveryServices RP x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/Capabilities.json                                                                                                                                                                                                                  |
| [recoveryServicesCheckNameAvailabilitySample.ts][recoveryserviceschecknameavailabilitysample] | API to check for resource name availability. A name is available if no other resource exists that has the same SubscriptionId, Resource Name and Type or if one or more such resources exist, each of these must be GC'd and their time of deletion be more than 24 Hours Ago x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/CheckNameAvailability_Available.json |
| [registeredIdentitiesDeleteSample.ts][registeredidentitiesdeletesample]                       | Unregisters the given container from your Recovery Services vault. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/DeleteRegisteredIdentities.json                                                                                                                                                                                                                 |
| [replicationUsagesListSample.ts][replicationusageslistsample]                                 | Fetches the replication usages of the vault. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/ListReplicationUsages.json                                                                                                                                                                                                                                            |
| [usagesListByVaultsSample.ts][usageslistbyvaultssample]                                       | Fetches the usages of the vault. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/ListUsages.json                                                                                                                                                                                                                                                                   |
| [vaultCertificatesCreateSample.ts][vaultcertificatescreatesample]                             | Uploads a certificate for a resource. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/PUTVaultCred.json                                                                                                                                                                                                                                                            |
| [vaultExtendedInfoCreateOrUpdateSample.ts][vaultextendedinfocreateorupdatesample]             | Create vault extended info. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/UpdateVaultExtendedInfo.json                                                                                                                                                                                                                                                           |
| [vaultExtendedInfoGetSample.ts][vaultextendedinfogetsample]                                   | Get the vault extended info. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/GETVaultExtendedInfo.json                                                                                                                                                                                                                                                             |
| [vaultExtendedInfoUpdateSample.ts][vaultextendedinfoupdatesample]                             | Update vault extended info. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/UpdateVaultExtendedInfo.json                                                                                                                                                                                                                                                           |
| [vaultsCreateOrUpdateSample.ts][vaultscreateorupdatesample]                                   | Creates or updates a Recovery Services vault. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/PUTVault.json                                                                                                                                                                                                                                                        |
| [vaultsDeleteSample.ts][vaultsdeletesample]                                                   | Deletes a vault. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/DeleteVault.json                                                                                                                                                                                                                                                                                  |
| [vaultsGetSample.ts][vaultsgetsample]                                                         | Get the Vault details. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/GETVault.json                                                                                                                                                                                                                                                                               |
| [vaultsListByResourceGroupSample.ts][vaultslistbyresourcegroupsample]                         | Retrieve a list of Vaults. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/ListResources.json                                                                                                                                                                                                                                                                      |
| [vaultsListBySubscriptionIdSample.ts][vaultslistbysubscriptionidsample]                       | Fetches all the resources of the specified type in the subscription. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/ListBySubscriptionIds.json                                                                                                                                                                                                                    |
| [vaultsUpdateSample.ts][vaultsupdatesample]                                                   | Updates the vault. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/PATCHVault.json                                                                                                                                                                                                                                                                                 |

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
node dist/getOperationResultSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env RECOVERYSERVICES_SUBSCRIPTION_ID="<recoveryservices subscription id>" RECOVERYSERVICES_RESOURCE_GROUP="<recoveryservices resource group>" node dist/getOperationResultSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[getoperationresultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/typescript/src/getOperationResultSample.ts
[getoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/typescript/src/getOperationStatusSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/typescript/src/operationsListSample.ts
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/typescript/src/privateLinkResourcesGetSample.ts
[privatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/typescript/src/privateLinkResourcesListSample.ts
[recoveryservicescapabilitiessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/typescript/src/recoveryServicesCapabilitiesSample.ts
[recoveryserviceschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/typescript/src/recoveryServicesCheckNameAvailabilitySample.ts
[registeredidentitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/typescript/src/registeredIdentitiesDeleteSample.ts
[replicationusageslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/typescript/src/replicationUsagesListSample.ts
[usageslistbyvaultssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/typescript/src/usagesListByVaultsSample.ts
[vaultcertificatescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/typescript/src/vaultCertificatesCreateSample.ts
[vaultextendedinfocreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/typescript/src/vaultExtendedInfoCreateOrUpdateSample.ts
[vaultextendedinfogetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/typescript/src/vaultExtendedInfoGetSample.ts
[vaultextendedinfoupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/typescript/src/vaultExtendedInfoUpdateSample.ts
[vaultscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/typescript/src/vaultsCreateOrUpdateSample.ts
[vaultsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/typescript/src/vaultsDeleteSample.ts
[vaultsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/typescript/src/vaultsGetSample.ts
[vaultslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/typescript/src/vaultsListByResourceGroupSample.ts
[vaultslistbysubscriptionidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/typescript/src/vaultsListBySubscriptionIdSample.ts
[vaultsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/typescript/src/vaultsUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-recoveryservices?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/recoveryservices/arm-recoveryservices/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
