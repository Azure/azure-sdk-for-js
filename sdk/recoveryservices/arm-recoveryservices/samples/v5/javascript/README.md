# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [getOperationResultSample.js][getoperationresultsample]                                       | Gets the operation result for a resource. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/GetOperationResult.json                                                                                                                                                                                                                                                  |
| [getOperationStatusSample.js][getoperationstatussample]                                       | Gets the operation status for a resource. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/GetOperationStatus.json                                                                                                                                                                                                                                                  |
| [operationsListSample.js][operationslistsample]                                               | Returns the list of available operations. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/ListOperations.json                                                                                                                                                                                                                                                      |
| [privateLinkResourcesGetSample.js][privatelinkresourcesgetsample]                             | Returns a specified private link resource that need to be created for Backup and SiteRecovery x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/GetPrivateLinkResources.json                                                                                                                                                                                         |
| [privateLinkResourcesListSample.js][privatelinkresourceslistsample]                           | Returns the list of private link resources that need to be created for Backup and SiteRecovery x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/ListPrivateLinkResources.json                                                                                                                                                                                       |
| [recoveryServicesCapabilitiesSample.js][recoveryservicescapabilitiessample]                   | API to get details about capabilities provided by Microsoft.RecoveryServices RP x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/Capabilities.json                                                                                                                                                                                                                  |
| [recoveryServicesCheckNameAvailabilitySample.js][recoveryserviceschecknameavailabilitysample] | API to check for resource name availability. A name is available if no other resource exists that has the same SubscriptionId, Resource Name and Type or if one or more such resources exist, each of these must be GC'd and their time of deletion be more than 24 Hours Ago x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/CheckNameAvailability_Available.json |
| [registeredIdentitiesDeleteSample.js][registeredidentitiesdeletesample]                       | Unregisters the given container from your Recovery Services vault. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/DeleteRegisteredIdentities.json                                                                                                                                                                                                                 |
| [replicationUsagesListSample.js][replicationusageslistsample]                                 | Fetches the replication usages of the vault. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/ListReplicationUsages.json                                                                                                                                                                                                                                            |
| [usagesListByVaultsSample.js][usageslistbyvaultssample]                                       | Fetches the usages of the vault. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/ListUsages.json                                                                                                                                                                                                                                                                   |
| [vaultCertificatesCreateSample.js][vaultcertificatescreatesample]                             | Uploads a certificate for a resource. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/PUTVaultCred.json                                                                                                                                                                                                                                                            |
| [vaultExtendedInfoCreateOrUpdateSample.js][vaultextendedinfocreateorupdatesample]             | Create vault extended info. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/UpdateVaultExtendedInfo.json                                                                                                                                                                                                                                                           |
| [vaultExtendedInfoGetSample.js][vaultextendedinfogetsample]                                   | Get the vault extended info. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/GETVaultExtendedInfo.json                                                                                                                                                                                                                                                             |
| [vaultExtendedInfoUpdateSample.js][vaultextendedinfoupdatesample]                             | Update vault extended info. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/UpdateVaultExtendedInfo.json                                                                                                                                                                                                                                                           |
| [vaultsCreateOrUpdateSample.js][vaultscreateorupdatesample]                                   | Creates or updates a Recovery Services vault. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/PUTVault.json                                                                                                                                                                                                                                                        |
| [vaultsDeleteSample.js][vaultsdeletesample]                                                   | Deletes a vault. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/DeleteVault.json                                                                                                                                                                                                                                                                                  |
| [vaultsGetSample.js][vaultsgetsample]                                                         | Get the Vault details. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/GETVault.json                                                                                                                                                                                                                                                                               |
| [vaultsListByResourceGroupSample.js][vaultslistbyresourcegroupsample]                         | Retrieve a list of Vaults. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/ListResources.json                                                                                                                                                                                                                                                                      |
| [vaultsListBySubscriptionIdSample.js][vaultslistbysubscriptionidsample]                       | Fetches all the resources of the specified type in the subscription. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/ListBySubscriptionIds.json                                                                                                                                                                                                                    |
| [vaultsUpdateSample.js][vaultsupdatesample]                                                   | Updates the vault. x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2023-01-01/examples/PATCHVault.json                                                                                                                                                                                                                                                                                 |

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
node getOperationResultSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env RECOVERYSERVICES_SUBSCRIPTION_ID="<recoveryservices subscription id>" RECOVERYSERVICES_RESOURCE_GROUP="<recoveryservices resource group>" node getOperationResultSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[getoperationresultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/javascript/getOperationResultSample.js
[getoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/javascript/getOperationStatusSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/javascript/operationsListSample.js
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/javascript/privateLinkResourcesGetSample.js
[privatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/javascript/privateLinkResourcesListSample.js
[recoveryservicescapabilitiessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/javascript/recoveryServicesCapabilitiesSample.js
[recoveryserviceschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/javascript/recoveryServicesCheckNameAvailabilitySample.js
[registeredidentitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/javascript/registeredIdentitiesDeleteSample.js
[replicationusageslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/javascript/replicationUsagesListSample.js
[usageslistbyvaultssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/javascript/usagesListByVaultsSample.js
[vaultcertificatescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/javascript/vaultCertificatesCreateSample.js
[vaultextendedinfocreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/javascript/vaultExtendedInfoCreateOrUpdateSample.js
[vaultextendedinfogetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/javascript/vaultExtendedInfoGetSample.js
[vaultextendedinfoupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/javascript/vaultExtendedInfoUpdateSample.js
[vaultscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/javascript/vaultsCreateOrUpdateSample.js
[vaultsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/javascript/vaultsDeleteSample.js
[vaultsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/javascript/vaultsGetSample.js
[vaultslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/javascript/vaultsListByResourceGroupSample.js
[vaultslistbysubscriptionidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/javascript/vaultsListBySubscriptionIdSample.js
[vaultsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/recoveryservices/arm-recoveryservices/samples/v5/javascript/vaultsUpdateSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-recoveryservices?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/recoveryservices/arm-recoveryservices/README.md
