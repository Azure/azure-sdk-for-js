# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                       | **Description**                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.ts][operationslistsample]                                     | Lists all of the available Key Vault Rest API operations. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/listOperations.json                                                                                                                                                              |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample] | Deletes the specified private endpoint connection associated with the key vault. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/deletePrivateEndpointConnection.json                                                                                                                      |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]       | Gets the specified private endpoint connection associated with the key vault. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/getPrivateEndpointConnection.json                                                                                                                            |
| [privateEndpointConnectionsPutSample.ts][privateendpointconnectionsputsample]       | Updates the specified private endpoint connection associated with the key vault. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/putPrivateEndpointConnection.json                                                                                                                         |
| [privateLinkResourcesListByVaultSample.ts][privatelinkresourceslistbyvaultsample]   | Gets the private link resources supported for the key vault. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/listPrivateLinkResources.json                                                                                                                                                 |
| [secretsCreateOrUpdateSample.ts][secretscreateorupdatesample]                       | Create or update a secret in a key vault in the specified subscription. NOTE: This API is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/createSecret.json |
| [secretsGetSample.ts][secretsgetsample]                                             | Gets the specified secret. NOTE: This API is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/getSecret.json                                                 |
| [secretsListSample.ts][secretslistsample]                                           | The List operation gets information about the secrets in a vault. NOTE: This API is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/listSecrets.json        |
| [secretsUpdateSample.ts][secretsupdatesample]                                       | Update a secret in the specified subscription. NOTE: This API is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/updateSecret.json                          |
| [vaultsCheckNameAvailabilitySample.ts][vaultschecknameavailabilitysample]           | Checks that the vault name is valid and is not already in use. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/checkVaultNameAvailability.json                                                                                                                                             |
| [vaultsCreateOrUpdateSample.ts][vaultscreateorupdatesample]                         | Create or update a key vault in the specified subscription. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/createVault.json                                                                                                                                                               |
| [vaultsDeleteSample.ts][vaultsdeletesample]                                         | Deletes the specified Azure key vault. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/deleteVault.json                                                                                                                                                                                    |
| [vaultsGetDeletedSample.ts][vaultsgetdeletedsample]                                 | Gets the deleted Azure key vault. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/getDeletedVault.json                                                                                                                                                                                     |
| [vaultsGetSample.ts][vaultsgetsample]                                               | Gets the specified Azure key vault. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/getVault.json                                                                                                                                                                                          |
| [vaultsListByResourceGroupSample.ts][vaultslistbyresourcegroupsample]               | The List operation gets information about the vaults associated with the subscription and within the specified resource group. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/listVaultByResourceGroup.json                                                                               |
| [vaultsListBySubscriptionSample.ts][vaultslistbysubscriptionsample]                 | The List operation gets information about the vaults associated with the subscription. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/listVaultBySubscription.json                                                                                                                        |
| [vaultsListDeletedSample.ts][vaultslistdeletedsample]                               | Gets information about the deleted vaults in a subscription. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/listDeletedVaults.json                                                                                                                                                        |
| [vaultsListSample.ts][vaultslistsample]                                             | The List operation gets information about the vaults associated with the subscription. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/listVault.json                                                                                                                                      |
| [vaultsPurgeDeletedSample.ts][vaultspurgedeletedsample]                             | Permanently deletes the specified vault. aka Purges the deleted Azure key vault. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/purgeDeletedVault.json                                                                                                                                    |
| [vaultsUpdateAccessPolicySample.ts][vaultsupdateaccesspolicysample]                 | Update access policies in a key vault in the specified subscription. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/updateAccessPoliciesAdd.json                                                                                                                                          |
| [vaultsUpdateSample.ts][vaultsupdatesample]                                         | Update a key vault in the specified subscription. x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/updateVault.json                                                                                                                                                                         |

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
node dist/operationsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env KEYVAULT_SUBSCRIPTION_ID="<keyvault subscription id>" node dist/operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/typescript/src/operationsListSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionsputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/typescript/src/privateEndpointConnectionsPutSample.ts
[privatelinkresourceslistbyvaultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/typescript/src/privateLinkResourcesListByVaultSample.ts
[secretscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/typescript/src/secretsCreateOrUpdateSample.ts
[secretsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/typescript/src/secretsGetSample.ts
[secretslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/typescript/src/secretsListSample.ts
[secretsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/typescript/src/secretsUpdateSample.ts
[vaultschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/typescript/src/vaultsCheckNameAvailabilitySample.ts
[vaultscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/typescript/src/vaultsCreateOrUpdateSample.ts
[vaultsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/typescript/src/vaultsDeleteSample.ts
[vaultsgetdeletedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/typescript/src/vaultsGetDeletedSample.ts
[vaultsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/typescript/src/vaultsGetSample.ts
[vaultslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/typescript/src/vaultsListByResourceGroupSample.ts
[vaultslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/typescript/src/vaultsListBySubscriptionSample.ts
[vaultslistdeletedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/typescript/src/vaultsListDeletedSample.ts
[vaultslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/typescript/src/vaultsListSample.ts
[vaultspurgedeletedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/typescript/src/vaultsPurgeDeletedSample.ts
[vaultsupdateaccesspolicysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/typescript/src/vaultsUpdateAccessPolicySample.ts
[vaultsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/samples/v2/typescript/src/vaultsUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-keyvault-profile-2020-09-01-hybrid?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/arm-keyvault-profile-2020-09-01-hybrid/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
