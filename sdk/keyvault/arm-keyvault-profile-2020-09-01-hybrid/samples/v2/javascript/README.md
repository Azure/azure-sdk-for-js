# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                       | **Description**                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.js][operationslistsample]                                     | Lists all of the available Key Vault Rest API operations. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/listOperations.json                                                                                                                                                              |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample] | Deletes the specified private endpoint connection associated with the key vault. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/deletePrivateEndpointConnection.json                                                                                                                      |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]       | Gets the specified private endpoint connection associated with the key vault. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/getPrivateEndpointConnection.json                                                                                                                            |
| [privateEndpointConnectionsPutSample.js][privateendpointconnectionsputsample]       | Updates the specified private endpoint connection associated with the key vault. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/putPrivateEndpointConnection.json                                                                                                                         |
| [privateLinkResourcesListByVaultSample.js][privatelinkresourceslistbyvaultsample]   | Gets the private link resources supported for the key vault. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/listPrivateLinkResources.json                                                                                                                                                 |
| [secretsCreateOrUpdateSample.js][secretscreateorupdatesample]                       | Create or update a secret in a key vault in the specified subscription. NOTE: This API is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/createSecret.json |
| [secretsGetSample.js][secretsgetsample]                                             | Gets the specified secret. NOTE: This API is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/getSecret.json                                                 |
| [secretsListSample.js][secretslistsample]                                           | The List operation gets information about the secrets in a vault. NOTE: This API is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/listSecrets.json        |
| [secretsUpdateSample.js][secretsupdatesample]                                       | Update a secret in the specified subscription. NOTE: This API is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/updateSecret.json                          |
| [vaultsCheckNameAvailabilitySample.js][vaultschecknameavailabilitysample]           | Checks that the vault name is valid and is not already in use. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/checkVaultNameAvailability.json                                                                                                                                             |
| [vaultsCreateOrUpdateSample.js][vaultscreateorupdatesample]                         | Create or update a key vault in the specified subscription. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/createVault.json                                                                                                                                                               |
| [vaultsDeleteSample.js][vaultsdeletesample]                                         | Deletes the specified Azure key vault. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/deleteVault.json                                                                                                                                                                                    |
| [vaultsGetDeletedSample.js][vaultsgetdeletedsample]                                 | Gets the deleted Azure key vault. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/getDeletedVault.json                                                                                                                                                                                     |
| [vaultsGetSample.js][vaultsgetsample]                                               | Gets the specified Azure key vault. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/getVault.json                                                                                                                                                                                          |
| [vaultsListByResourceGroupSample.js][vaultslistbyresourcegroupsample]               | The List operation gets information about the vaults associated with the subscription and within the specified resource group. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/listVaultByResourceGroup.json                                                                               |
| [vaultsListBySubscriptionSample.js][vaultslistbysubscriptionsample]                 | The List operation gets information about the vaults associated with the subscription. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/listVaultBySubscription.json                                                                                                                        |
| [vaultsListDeletedSample.js][vaultslistdeletedsample]                               | Gets information about the deleted vaults in a subscription. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/listDeletedVaults.json                                                                                                                                                        |
| [vaultsListSample.js][vaultslistsample]                                             | The List operation gets information about the vaults associated with the subscription. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/listVault.json                                                                                                                                      |
| [vaultsPurgeDeletedSample.js][vaultspurgedeletedsample]                             | Permanently deletes the specified vault. aka Purges the deleted Azure key vault. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/purgeDeletedVault.json                                                                                                                                    |
| [vaultsUpdateAccessPolicySample.js][vaultsupdateaccesspolicysample]                 | Update access policies in a key vault in the specified subscription. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/updateAccessPoliciesAdd.json                                                                                                                                          |
| [vaultsUpdateSample.js][vaultsupdatesample]                                         | Update a key vault in the specified subscription. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/updateVault.json                                                                                                                                                                         |

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
node operationsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env KEYVAULT_SUBSCRIPTION_ID="<keyvault subscription id>" node operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/javascript/operationsListSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionsputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/javascript/privateEndpointConnectionsPutSample.js
[privatelinkresourceslistbyvaultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/javascript/privateLinkResourcesListByVaultSample.js
[secretscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/javascript/secretsCreateOrUpdateSample.js
[secretsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/javascript/secretsGetSample.js
[secretslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/javascript/secretsListSample.js
[secretsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/javascript/secretsUpdateSample.js
[vaultschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/javascript/vaultsCheckNameAvailabilitySample.js
[vaultscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/javascript/vaultsCreateOrUpdateSample.js
[vaultsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/javascript/vaultsDeleteSample.js
[vaultsgetdeletedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/javascript/vaultsGetDeletedSample.js
[vaultsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/javascript/vaultsGetSample.js
[vaultslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/javascript/vaultsListByResourceGroupSample.js
[vaultslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/javascript/vaultsListBySubscriptionSample.js
[vaultslistdeletedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/javascript/vaultsListDeletedSample.js
[vaultslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/javascript/vaultsListSample.js
[vaultspurgedeletedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/javascript/vaultsPurgeDeletedSample.js
[vaultsupdateaccesspolicysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/javascript/vaultsUpdateAccessPolicySample.js
[vaultsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/javascript/vaultsUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-keyvault-profile-2020-09-01-hybrid?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/README.md
