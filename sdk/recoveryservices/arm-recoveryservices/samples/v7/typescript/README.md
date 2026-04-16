# @azure/arm-recoveryservices client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-recoveryservices in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [deletedVaultsGetOperationStatusSample.ts][deletedvaultsgetoperationstatussample]             | get the operation status of a deleted vault. x-ms-original-file: 2025-08-01/DeletedVaults_GetOperationStatus.json                                                                                                                                                                                                                                 |
| [deletedVaultsGetSample.ts][deletedvaultsgetsample]                                           | get a specific deleted vault. x-ms-original-file: 2025-08-01/DeletedVaults_Get.json                                                                                                                                                                                                                                                               |
| [deletedVaultsListBySubscriptionIdSample.ts][deletedvaultslistbysubscriptionidsample]         | list deleted vaults in a subscription. x-ms-original-file: 2025-08-01/DeletedVaults_ListBySubscriptionId.json                                                                                                                                                                                                                                     |
| [deletedVaultsUndeleteSample.ts][deletedvaultsundeletesample]                                 | start undelete of a deleted vault. x-ms-original-file: 2025-08-01/DeletedVaults_Undelete.json                                                                                                                                                                                                                                                     |
| [getOperationResultSample.ts][getoperationresultsample]                                       | gets the operation result for a resource. x-ms-original-file: 2025-08-01/GetOperationResult.json                                                                                                                                                                                                                                                  |
| [getOperationStatusSample.ts][getoperationstatussample]                                       | gets the operation status for a resource. x-ms-original-file: 2025-08-01/GetOperationStatus.json                                                                                                                                                                                                                                                  |
| [privateLinkResourcesGetSample.ts][privatelinkresourcesgetsample]                             | returns a specified private link resource that need to be created for Backup and SiteRecovery x-ms-original-file: 2025-08-01/GetPrivateLinkResources.json                                                                                                                                                                                         |
| [privateLinkResourcesListSample.ts][privatelinkresourceslistsample]                           | returns the list of private link resources that need to be created for Backup and SiteRecovery x-ms-original-file: 2025-08-01/ListPrivateLinkResources.json                                                                                                                                                                                       |
| [recoveryServicesCapabilitiesSample.ts][recoveryservicescapabilitiessample]                   | aPI to get details about capabilities provided by Microsoft.RecoveryServices RP x-ms-original-file: 2025-08-01/Capabilities.json                                                                                                                                                                                                                  |
| [recoveryServicesCheckNameAvailabilitySample.ts][recoveryserviceschecknameavailabilitysample] | aPI to check for resource name availability. A name is available if no other resource exists that has the same SubscriptionId, Resource Name and Type or if one or more such resources exist, each of these must be GC'd and their time of deletion be more than 24 Hours Ago x-ms-original-file: 2025-08-01/CheckNameAvailability_Available.json |
| [registeredIdentitiesDeleteSample.ts][registeredidentitiesdeletesample]                       | unregisters the given container from your Recovery Services vault. x-ms-original-file: 2025-08-01/DeleteRegisteredIdentities.json                                                                                                                                                                                                                 |
| [replicationUsagesListSample.ts][replicationusageslistsample]                                 | fetches the replication usages of the vault. x-ms-original-file: 2025-08-01/ListReplicationUsages.json                                                                                                                                                                                                                                            |
| [usagesListByVaultsSample.ts][usageslistbyvaultssample]                                       | fetches the usages of the vault. x-ms-original-file: 2025-08-01/ListUsages.json                                                                                                                                                                                                                                                                   |
| [vaultCertificatesCreateSample.ts][vaultcertificatescreatesample]                             | uploads a certificate for a resource. x-ms-original-file: 2025-08-01/PUTVaultCred.json                                                                                                                                                                                                                                                            |
| [vaultExtendedInfoCreateOrUpdateSample.ts][vaultextendedinfocreateorupdatesample]             | create vault extended info. x-ms-original-file: 2025-08-01/UpdateVaultExtendedInfo_Put.json                                                                                                                                                                                                                                                       |
| [vaultExtendedInfoGetSample.ts][vaultextendedinfogetsample]                                   | get the vault extended info. x-ms-original-file: 2025-08-01/GETVaultExtendedInfo.json                                                                                                                                                                                                                                                             |
| [vaultExtendedInfoUpdateSample.ts][vaultextendedinfoupdatesample]                             | update vault extended info. x-ms-original-file: 2025-08-01/UpdateVaultExtendedInfo.json                                                                                                                                                                                                                                                           |
| [vaultsCreateOrUpdateSample.ts][vaultscreateorupdatesample]                                   | creates or updates a Recovery Services vault. x-ms-original-file: 2025-08-01/PUTVault.json                                                                                                                                                                                                                                                        |
| [vaultsDeleteSample.ts][vaultsdeletesample]                                                   | deletes a vault. x-ms-original-file: 2025-08-01/DeleteVault.json                                                                                                                                                                                                                                                                                  |
| [vaultsGetSample.ts][vaultsgetsample]                                                         | get the Vault details. x-ms-original-file: 2025-08-01/GETVault.json                                                                                                                                                                                                                                                                               |
| [vaultsListByResourceGroupSample.ts][vaultslistbyresourcegroupsample]                         | retrieve a list of Vaults. x-ms-original-file: 2025-08-01/ListResources.json                                                                                                                                                                                                                                                                      |
| [vaultsListBySubscriptionIdSample.ts][vaultslistbysubscriptionidsample]                       | fetches all the resources of the specified type in the subscription. x-ms-original-file: 2025-08-01/ListBySubscriptionIds.json                                                                                                                                                                                                                    |
| [vaultsUpdateSample.ts][vaultsupdatesample]                                                   | updates the vault. x-ms-original-file: 2025-08-01/PATCHVault.json                                                                                                                                                                                                                                                                                 |

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
node dist/deletedVaultsGetOperationStatusSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/deletedVaultsGetOperationStatusSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[deletedvaultsgetoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/typescript/src/deletedVaultsGetOperationStatusSample.ts
[deletedvaultsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/typescript/src/deletedVaultsGetSample.ts
[deletedvaultslistbysubscriptionidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/typescript/src/deletedVaultsListBySubscriptionIdSample.ts
[deletedvaultsundeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/typescript/src/deletedVaultsUndeleteSample.ts
[getoperationresultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/typescript/src/getOperationResultSample.ts
[getoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/typescript/src/getOperationStatusSample.ts
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/typescript/src/privateLinkResourcesGetSample.ts
[privatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/typescript/src/privateLinkResourcesListSample.ts
[recoveryservicescapabilitiessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/typescript/src/recoveryServicesCapabilitiesSample.ts
[recoveryserviceschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/typescript/src/recoveryServicesCheckNameAvailabilitySample.ts
[registeredidentitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/typescript/src/registeredIdentitiesDeleteSample.ts
[replicationusageslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/typescript/src/replicationUsagesListSample.ts
[usageslistbyvaultssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/typescript/src/usagesListByVaultsSample.ts
[vaultcertificatescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/typescript/src/vaultCertificatesCreateSample.ts
[vaultextendedinfocreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/typescript/src/vaultExtendedInfoCreateOrUpdateSample.ts
[vaultextendedinfogetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/typescript/src/vaultExtendedInfoGetSample.ts
[vaultextendedinfoupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/typescript/src/vaultExtendedInfoUpdateSample.ts
[vaultscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/typescript/src/vaultsCreateOrUpdateSample.ts
[vaultsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/typescript/src/vaultsDeleteSample.ts
[vaultsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/typescript/src/vaultsGetSample.ts
[vaultslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/typescript/src/vaultsListByResourceGroupSample.ts
[vaultslistbysubscriptionidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/typescript/src/vaultsListBySubscriptionIdSample.ts
[vaultsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/typescript/src/vaultsUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-recoveryservices?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/recoveryservices/arm-recoveryservices/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
