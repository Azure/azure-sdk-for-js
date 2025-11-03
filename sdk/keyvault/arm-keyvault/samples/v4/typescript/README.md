# @azure/arm-keyvault client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-keyvault in some common scenarios.

| **File Name**                                                                                               | **Description**                                                                                                                                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [keysCreateIfNotExistSample.ts][keyscreateifnotexistsample]                                                 | creates the first version of a new key if it does not exist. If it already exists, then the existing key is returned without any write operations being performed. This API does not create subsequent versions, and does not update existing keys. x-ms-original-file: 2025-05-01/createKey.json           |
| [keysGetSample.ts][keysgetsample]                                                                           | gets the current version of the specified key from the specified key vault. x-ms-original-file: 2025-05-01/getKey.json                                                                                                                                                                                      |
| [keysGetVersionSample.ts][keysgetversionsample]                                                             | gets the specified version of the specified key in the specified key vault. x-ms-original-file: 2025-05-01/getKeyVersion.json                                                                                                                                                                               |
| [keysListSample.ts][keyslistsample]                                                                         | lists the keys in the specified key vault. x-ms-original-file: 2025-05-01/listKeys.json                                                                                                                                                                                                                     |
| [keysListVersionsSample.ts][keyslistversionssample]                                                         | lists the keys in the specified key vault. x-ms-original-file: 2025-05-01/listKeyVersions.json                                                                                                                                                                                                              |
| [managedHsmKeysCreateIfNotExistSample.ts][managedhsmkeyscreateifnotexistsample]                             | creates the first version of a new key if it does not exist. If it already exists, then the existing key is returned without any write operations being performed. This API does not create subsequent versions, and does not update existing keys. x-ms-original-file: 2025-05-01/managedHsmCreateKey.json |
| [managedHsmKeysGetSample.ts][managedhsmkeysgetsample]                                                       | gets the current version of the specified key from the specified managed HSM. x-ms-original-file: 2025-05-01/managedHsmGetKey.json                                                                                                                                                                          |
| [managedHsmKeysGetVersionSample.ts][managedhsmkeysgetversionsample]                                         | gets the specified version of the specified key in the specified managed HSM. x-ms-original-file: 2025-05-01/managedHsmGetKeyVersion.json                                                                                                                                                                   |
| [managedHsmKeysListSample.ts][managedhsmkeyslistsample]                                                     | lists the keys in the specified managed HSM. x-ms-original-file: 2025-05-01/managedHsmListKeys.json                                                                                                                                                                                                         |
| [managedHsmKeysListVersionsSample.ts][managedhsmkeyslistversionssample]                                     | lists the keys in the specified managed HSM. x-ms-original-file: 2025-05-01/managedHsmListKeyVersions.json                                                                                                                                                                                                  |
| [managedHsmsCheckMhsmNameAvailabilitySample.ts][managedhsmscheckmhsmnameavailabilitysample]                 | checks that the managed hsm name is valid and is not already in use. x-ms-original-file: 2025-05-01/ManagedHsm_checkMhsmNameAvailability.json                                                                                                                                                               |
| [managedHsmsCreateOrUpdateSample.ts][managedhsmscreateorupdatesample]                                       | create or update a managed HSM Pool in the specified subscription. x-ms-original-file: 2025-05-01/ManagedHsm_CreateOrUpdate.json                                                                                                                                                                            |
| [managedHsmsDeleteSample.ts][managedhsmsdeletesample]                                                       | deletes the specified managed HSM Pool. x-ms-original-file: 2025-05-01/ManagedHsm_Delete.json                                                                                                                                                                                                               |
| [managedHsmsGetDeletedSample.ts][managedhsmsgetdeletedsample]                                               | gets the specified deleted managed HSM. x-ms-original-file: 2025-05-01/DeletedManagedHsm_Get.json                                                                                                                                                                                                           |
| [managedHsmsGetSample.ts][managedhsmsgetsample]                                                             | gets the specified managed HSM Pool. x-ms-original-file: 2025-05-01/ManagedHsm_Get.json                                                                                                                                                                                                                     |
| [managedHsmsListByResourceGroupSample.ts][managedhsmslistbyresourcegroupsample]                             | the List operation gets information about the managed HSM Pools associated with the subscription and within the specified resource group. x-ms-original-file: 2025-05-01/ManagedHsm_ListByResourceGroup.json                                                                                                |
| [managedHsmsListBySubscriptionSample.ts][managedhsmslistbysubscriptionsample]                               | the List operation gets information about the managed HSM Pools associated with the subscription. x-ms-original-file: 2025-05-01/ManagedHsm_ListBySubscription.json                                                                                                                                         |
| [managedHsmsListDeletedSample.ts][managedhsmslistdeletedsample]                                             | the List operation gets information about the deleted managed HSMs associated with the subscription. x-ms-original-file: 2025-05-01/DeletedManagedHsm_List.json                                                                                                                                             |
| [managedHsmsPurgeDeletedSample.ts][managedhsmspurgedeletedsample]                                           | permanently deletes the specified managed HSM. x-ms-original-file: 2025-05-01/DeletedManagedHsm_Purge.json                                                                                                                                                                                                  |
| [managedHsmsUpdateSample.ts][managedhsmsupdatesample]                                                       | update a managed HSM Pool in the specified subscription. x-ms-original-file: 2025-05-01/ManagedHsm_Update.json                                                                                                                                                                                              |
| [mhsmPrivateEndpointConnectionsDeleteSample.ts][mhsmprivateendpointconnectionsdeletesample]                 | deletes the specified private endpoint connection associated with the managed hsm pool. x-ms-original-file: 2025-05-01/ManagedHsm_deletePrivateEndpointConnection.json                                                                                                                                      |
| [mhsmPrivateEndpointConnectionsGetSample.ts][mhsmprivateendpointconnectionsgetsample]                       | gets the specified private endpoint connection associated with the managed HSM Pool. x-ms-original-file: 2025-05-01/ManagedHsm_getPrivateEndpointConnection.json                                                                                                                                            |
| [mhsmPrivateEndpointConnectionsListByResourceSample.ts][mhsmprivateendpointconnectionslistbyresourcesample] | the List operation gets information about the private endpoint connections associated with the managed HSM Pool. x-ms-original-file: 2025-05-01/ManagedHsm_ListPrivateEndpointConnectionsByResource.json                                                                                                    |
| [mhsmPrivateEndpointConnectionsPutSample.ts][mhsmprivateendpointconnectionsputsample]                       | updates the specified private endpoint connection associated with the managed hsm pool. x-ms-original-file: 2025-05-01/ManagedHsm_putPrivateEndpointConnection.json                                                                                                                                         |
| [mhsmPrivateLinkResourcesListByMhsmResourceSample.ts][mhsmprivatelinkresourceslistbymhsmresourcesample]     | gets the private link resources supported for the managed hsm pool. x-ms-original-file: 2025-05-01/ManagedHsm_listPrivateLinkResources.json                                                                                                                                                                 |
| [mhsmRegionsListByResourceSample.ts][mhsmregionslistbyresourcesample]                                       | the List operation gets information about the regions associated with the managed HSM Pool. x-ms-original-file: 2025-05-01/ManagedHsm_ListRegionsByResource.json                                                                                                                                            |
| [operationsListSample.ts][operationslistsample]                                                             | list the operations for the provider x-ms-original-file: 2025-05-01/listOperations.json                                                                                                                                                                                                                     |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                         | deletes the specified private endpoint connection associated with the key vault. x-ms-original-file: 2025-05-01/deletePrivateEndpointConnection.json                                                                                                                                                        |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                               | gets the specified private endpoint connection associated with the key vault. x-ms-original-file: 2025-05-01/getPrivateEndpointConnection.json                                                                                                                                                              |
| [privateEndpointConnectionsListByResourceSample.ts][privateendpointconnectionslistbyresourcesample]         | the List operation gets information about the private endpoint connections associated with the vault. x-ms-original-file: 2025-05-01/listPrivateEndpointConnection.json                                                                                                                                     |
| [privateEndpointConnectionsPutSample.ts][privateendpointconnectionsputsample]                               | updates the specified private endpoint connection associated with the key vault. x-ms-original-file: 2025-05-01/putPrivateEndpointConnection.json                                                                                                                                                           |
| [privateLinkResourcesListByVaultSample.ts][privatelinkresourceslistbyvaultsample]                           | gets the private link resources supported for the key vault. x-ms-original-file: 2025-05-01/listPrivateLinkResources.json                                                                                                                                                                                   |
| [secretsCreateOrUpdateSample.ts][secretscreateorupdatesample]                                               | create or update a secret in a key vault in the specified subscription. NOTE: This API is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets. x-ms-original-file: 2025-05-01/createSecret.json                                   |
| [secretsGetSample.ts][secretsgetsample]                                                                     | gets the specified secret. NOTE: This API is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets. x-ms-original-file: 2025-05-01/getSecret.json                                                                                   |
| [secretsListSample.ts][secretslistsample]                                                                   | the List operation gets information about the secrets in a vault. NOTE: This API is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets. x-ms-original-file: 2025-05-01/listSecrets.json                                          |
| [secretsUpdateSample.ts][secretsupdatesample]                                                               | update a secret in the specified subscription. NOTE: This API is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets. x-ms-original-file: 2025-05-01/updateSecret.json                                                            |
| [vaultsCheckNameAvailabilitySample.ts][vaultschecknameavailabilitysample]                                   | checks that the vault name is valid and is not already in use. x-ms-original-file: 2025-05-01/checkVaultNameAvailability.json                                                                                                                                                                               |
| [vaultsCreateOrUpdateSample.ts][vaultscreateorupdatesample]                                                 | create or update a key vault in the specified subscription. x-ms-original-file: 2025-05-01/createVault.json                                                                                                                                                                                                 |
| [vaultsDeleteSample.ts][vaultsdeletesample]                                                                 | deletes the specified Azure key vault. x-ms-original-file: 2025-05-01/deleteVault.json                                                                                                                                                                                                                      |
| [vaultsGetDeletedSample.ts][vaultsgetdeletedsample]                                                         | gets the deleted Azure key vault. x-ms-original-file: 2025-05-01/getDeletedVault.json                                                                                                                                                                                                                       |
| [vaultsGetSample.ts][vaultsgetsample]                                                                       | gets the specified Azure key vault. x-ms-original-file: 2025-05-01/getVault.json                                                                                                                                                                                                                            |
| [vaultsListByResourceGroupSample.ts][vaultslistbyresourcegroupsample]                                       | the List operation gets information about the vaults associated with the subscription and within the specified resource group. x-ms-original-file: 2025-05-01/listVaultByResourceGroup.json                                                                                                                 |
| [vaultsListBySubscriptionSample.ts][vaultslistbysubscriptionsample]                                         | the List operation gets information about the vaults associated with the subscription. x-ms-original-file: 2025-05-01/listVaultBySubscription.json                                                                                                                                                          |
| [vaultsListDeletedSample.ts][vaultslistdeletedsample]                                                       | gets information about the deleted vaults in a subscription. x-ms-original-file: 2025-05-01/listDeletedVaults.json                                                                                                                                                                                          |
| [vaultsListSample.ts][vaultslistsample]                                                                     | the List operation gets information about the vaults associated with the subscription. x-ms-original-file: 2025-05-01/listVault.json                                                                                                                                                                        |
| [vaultsPurgeDeletedSample.ts][vaultspurgedeletedsample]                                                     | permanently deletes the specified vault. aka Purges the deleted Azure key vault. x-ms-original-file: 2025-05-01/purgeDeletedVault.json                                                                                                                                                                      |
| [vaultsUpdateAccessPolicySample.ts][vaultsupdateaccesspolicysample]                                         | update access policies in a key vault in the specified subscription. x-ms-original-file: 2025-05-01/updateAccessPoliciesAdd.json                                                                                                                                                                            |
| [vaultsUpdateSample.ts][vaultsupdatesample]                                                                 | update a key vault in the specified subscription. x-ms-original-file: 2025-05-01/updateVault.json                                                                                                                                                                                                           |

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
node dist/keysCreateIfNotExistSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/keysCreateIfNotExistSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[keyscreateifnotexistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/keysCreateIfNotExistSample.ts
[keysgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/keysGetSample.ts
[keysgetversionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/keysGetVersionSample.ts
[keyslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/keysListSample.ts
[keyslistversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/keysListVersionsSample.ts
[managedhsmkeyscreateifnotexistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/managedHsmKeysCreateIfNotExistSample.ts
[managedhsmkeysgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/managedHsmKeysGetSample.ts
[managedhsmkeysgetversionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/managedHsmKeysGetVersionSample.ts
[managedhsmkeyslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/managedHsmKeysListSample.ts
[managedhsmkeyslistversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/managedHsmKeysListVersionsSample.ts
[managedhsmscheckmhsmnameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/managedHsmsCheckMhsmNameAvailabilitySample.ts
[managedhsmscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/managedHsmsCreateOrUpdateSample.ts
[managedhsmsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/managedHsmsDeleteSample.ts
[managedhsmsgetdeletedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/managedHsmsGetDeletedSample.ts
[managedhsmsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/managedHsmsGetSample.ts
[managedhsmslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/managedHsmsListByResourceGroupSample.ts
[managedhsmslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/managedHsmsListBySubscriptionSample.ts
[managedhsmslistdeletedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/managedHsmsListDeletedSample.ts
[managedhsmspurgedeletedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/managedHsmsPurgeDeletedSample.ts
[managedhsmsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/managedHsmsUpdateSample.ts
[mhsmprivateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/mhsmPrivateEndpointConnectionsDeleteSample.ts
[mhsmprivateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/mhsmPrivateEndpointConnectionsGetSample.ts
[mhsmprivateendpointconnectionslistbyresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/mhsmPrivateEndpointConnectionsListByResourceSample.ts
[mhsmprivateendpointconnectionsputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/mhsmPrivateEndpointConnectionsPutSample.ts
[mhsmprivatelinkresourceslistbymhsmresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/mhsmPrivateLinkResourcesListByMhsmResourceSample.ts
[mhsmregionslistbyresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/mhsmRegionsListByResourceSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/operationsListSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistbyresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/privateEndpointConnectionsListByResourceSample.ts
[privateendpointconnectionsputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/privateEndpointConnectionsPutSample.ts
[privatelinkresourceslistbyvaultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/privateLinkResourcesListByVaultSample.ts
[secretscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/secretsCreateOrUpdateSample.ts
[secretsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/secretsGetSample.ts
[secretslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/secretsListSample.ts
[secretsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/secretsUpdateSample.ts
[vaultschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/vaultsCheckNameAvailabilitySample.ts
[vaultscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/vaultsCreateOrUpdateSample.ts
[vaultsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/vaultsDeleteSample.ts
[vaultsgetdeletedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/vaultsGetDeletedSample.ts
[vaultsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/vaultsGetSample.ts
[vaultslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/vaultsListByResourceGroupSample.ts
[vaultslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/vaultsListBySubscriptionSample.ts
[vaultslistdeletedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/vaultsListDeletedSample.ts
[vaultslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/vaultsListSample.ts
[vaultspurgedeletedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/vaultsPurgeDeletedSample.ts
[vaultsupdateaccesspolicysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/vaultsUpdateAccessPolicySample.ts
[vaultsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault/samples/v4/typescript/src/vaultsUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-keyvault?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/arm-keyvault/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
