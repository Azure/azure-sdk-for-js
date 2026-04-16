# @azure/arm-recoveryservices client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-recoveryservices in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [deletedVaultsGetOperationStatusSample.js][deletedvaultsgetoperationstatussample]             | get the operation status of a deleted vault. x-ms-original-file: 2025-08-01/DeletedVaults_GetOperationStatus.json                                                                                                                                                                                                                                 |
| [deletedVaultsGetSample.js][deletedvaultsgetsample]                                           | get a specific deleted vault. x-ms-original-file: 2025-08-01/DeletedVaults_Get.json                                                                                                                                                                                                                                                               |
| [deletedVaultsListBySubscriptionIdSample.js][deletedvaultslistbysubscriptionidsample]         | list deleted vaults in a subscription. x-ms-original-file: 2025-08-01/DeletedVaults_ListBySubscriptionId.json                                                                                                                                                                                                                                     |
| [deletedVaultsUndeleteSample.js][deletedvaultsundeletesample]                                 | start undelete of a deleted vault. x-ms-original-file: 2025-08-01/DeletedVaults_Undelete.json                                                                                                                                                                                                                                                     |
| [getOperationResultSample.js][getoperationresultsample]                                       | gets the operation result for a resource. x-ms-original-file: 2025-08-01/GetOperationResult.json                                                                                                                                                                                                                                                  |
| [getOperationStatusSample.js][getoperationstatussample]                                       | gets the operation status for a resource. x-ms-original-file: 2025-08-01/GetOperationStatus.json                                                                                                                                                                                                                                                  |
| [privateLinkResourcesGetSample.js][privatelinkresourcesgetsample]                             | returns a specified private link resource that need to be created for Backup and SiteRecovery x-ms-original-file: 2025-08-01/GetPrivateLinkResources.json                                                                                                                                                                                         |
| [privateLinkResourcesListSample.js][privatelinkresourceslistsample]                           | returns the list of private link resources that need to be created for Backup and SiteRecovery x-ms-original-file: 2025-08-01/ListPrivateLinkResources.json                                                                                                                                                                                       |
| [recoveryServicesCapabilitiesSample.js][recoveryservicescapabilitiessample]                   | aPI to get details about capabilities provided by Microsoft.RecoveryServices RP x-ms-original-file: 2025-08-01/Capabilities.json                                                                                                                                                                                                                  |
| [recoveryServicesCheckNameAvailabilitySample.js][recoveryserviceschecknameavailabilitysample] | aPI to check for resource name availability. A name is available if no other resource exists that has the same SubscriptionId, Resource Name and Type or if one or more such resources exist, each of these must be GC'd and their time of deletion be more than 24 Hours Ago x-ms-original-file: 2025-08-01/CheckNameAvailability_Available.json |
| [registeredIdentitiesDeleteSample.js][registeredidentitiesdeletesample]                       | unregisters the given container from your Recovery Services vault. x-ms-original-file: 2025-08-01/DeleteRegisteredIdentities.json                                                                                                                                                                                                                 |
| [replicationUsagesListSample.js][replicationusageslistsample]                                 | fetches the replication usages of the vault. x-ms-original-file: 2025-08-01/ListReplicationUsages.json                                                                                                                                                                                                                                            |
| [usagesListByVaultsSample.js][usageslistbyvaultssample]                                       | fetches the usages of the vault. x-ms-original-file: 2025-08-01/ListUsages.json                                                                                                                                                                                                                                                                   |
| [vaultCertificatesCreateSample.js][vaultcertificatescreatesample]                             | uploads a certificate for a resource. x-ms-original-file: 2025-08-01/PUTVaultCred.json                                                                                                                                                                                                                                                            |
| [vaultExtendedInfoCreateOrUpdateSample.js][vaultextendedinfocreateorupdatesample]             | create vault extended info. x-ms-original-file: 2025-08-01/UpdateVaultExtendedInfo_Put.json                                                                                                                                                                                                                                                       |
| [vaultExtendedInfoGetSample.js][vaultextendedinfogetsample]                                   | get the vault extended info. x-ms-original-file: 2025-08-01/GETVaultExtendedInfo.json                                                                                                                                                                                                                                                             |
| [vaultExtendedInfoUpdateSample.js][vaultextendedinfoupdatesample]                             | update vault extended info. x-ms-original-file: 2025-08-01/UpdateVaultExtendedInfo.json                                                                                                                                                                                                                                                           |
| [vaultsCreateOrUpdateSample.js][vaultscreateorupdatesample]                                   | creates or updates a Recovery Services vault. x-ms-original-file: 2025-08-01/PUTVault.json                                                                                                                                                                                                                                                        |
| [vaultsDeleteSample.js][vaultsdeletesample]                                                   | deletes a vault. x-ms-original-file: 2025-08-01/DeleteVault.json                                                                                                                                                                                                                                                                                  |
| [vaultsGetSample.js][vaultsgetsample]                                                         | get the Vault details. x-ms-original-file: 2025-08-01/GETVault.json                                                                                                                                                                                                                                                                               |
| [vaultsListByResourceGroupSample.js][vaultslistbyresourcegroupsample]                         | retrieve a list of Vaults. x-ms-original-file: 2025-08-01/ListResources.json                                                                                                                                                                                                                                                                      |
| [vaultsListBySubscriptionIdSample.js][vaultslistbysubscriptionidsample]                       | fetches all the resources of the specified type in the subscription. x-ms-original-file: 2025-08-01/ListBySubscriptionIds.json                                                                                                                                                                                                                    |
| [vaultsUpdateSample.js][vaultsupdatesample]                                                   | updates the vault. x-ms-original-file: 2025-08-01/PATCHVault.json                                                                                                                                                                                                                                                                                 |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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
node deletedVaultsGetOperationStatusSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node deletedVaultsGetOperationStatusSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[deletedvaultsgetoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/javascript/deletedVaultsGetOperationStatusSample.js
[deletedvaultsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/javascript/deletedVaultsGetSample.js
[deletedvaultslistbysubscriptionidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/javascript/deletedVaultsListBySubscriptionIdSample.js
[deletedvaultsundeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/javascript/deletedVaultsUndeleteSample.js
[getoperationresultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/javascript/getOperationResultSample.js
[getoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/javascript/getOperationStatusSample.js
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/javascript/privateLinkResourcesGetSample.js
[privatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/javascript/privateLinkResourcesListSample.js
[recoveryservicescapabilitiessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/javascript/recoveryServicesCapabilitiesSample.js
[recoveryserviceschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/javascript/recoveryServicesCheckNameAvailabilitySample.js
[registeredidentitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/javascript/registeredIdentitiesDeleteSample.js
[replicationusageslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/javascript/replicationUsagesListSample.js
[usageslistbyvaultssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/javascript/usagesListByVaultsSample.js
[vaultcertificatescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/javascript/vaultCertificatesCreateSample.js
[vaultextendedinfocreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/javascript/vaultExtendedInfoCreateOrUpdateSample.js
[vaultextendedinfogetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/javascript/vaultExtendedInfoGetSample.js
[vaultextendedinfoupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/javascript/vaultExtendedInfoUpdateSample.js
[vaultscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/javascript/vaultsCreateOrUpdateSample.js
[vaultsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/javascript/vaultsDeleteSample.js
[vaultsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/javascript/vaultsGetSample.js
[vaultslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/javascript/vaultsListByResourceGroupSample.js
[vaultslistbysubscriptionidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/javascript/vaultsListBySubscriptionIdSample.js
[vaultsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v7/javascript/vaultsUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-recoveryservices?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/recoveryservices/arm-recoveryservices/README.md
