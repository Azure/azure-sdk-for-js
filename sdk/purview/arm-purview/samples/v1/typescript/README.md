# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accountsAddRootCollectionAdminSample.ts][accountsaddrootcollectionadminsample]                     | Add the administrator for root collection associated with this account. x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Accounts_AddRootCollectionAdmin.json          |
| [accountsCheckNameAvailabilitySample.ts][accountschecknameavailabilitysample]                       | Checks if account name is available. x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Accounts_CheckNameAvailability.json                                              |
| [accountsCreateOrUpdateSample.ts][accountscreateorupdatesample]                                     | Creates or updates an account x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Accounts_CreateOrUpdate.json                                                            |
| [accountsDeleteSample.ts][accountsdeletesample]                                                     | Deletes an account resource x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Accounts_Delete.json                                                                      |
| [accountsGetSample.ts][accountsgetsample]                                                           | Get an account x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Accounts_Get.json                                                                                      |
| [accountsListByResourceGroupSample.ts][accountslistbyresourcegroupsample]                           | List accounts in ResourceGroup x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Accounts_ListByResourceGroup.json                                                      |
| [accountsListBySubscriptionSample.ts][accountslistbysubscriptionsample]                             | List accounts in Subscription x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Accounts_ListBySubscription.json                                                        |
| [accountsListKeysSample.ts][accountslistkeyssample]                                                 | List the authorization keys associated with this account. x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Accounts_ListKeys.json                                      |
| [accountsUpdateSample.ts][accountsupdatesample]                                                     | Updates an account x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Accounts_Update.json                                                                               |
| [defaultAccountsGetSample.ts][defaultaccountsgetsample]                                             | Get the default account for the scope. x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/DefaultAccounts_Get.json                                                       |
| [defaultAccountsRemoveSample.ts][defaultaccountsremovesample]                                       | Removes the default account from the scope. x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/DefaultAccounts_Remove.json                                               |
| [defaultAccountsSetSample.ts][defaultaccountssetsample]                                             | Sets the default account for the scope. x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/DefaultAccounts_Set.json                                                      |
| [operationsListSample.ts][operationslistsample]                                                     | List of available operations x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Operations_List.json                                                                     |
| [privateEndpointConnectionsCreateOrUpdateSample.ts][privateendpointconnectionscreateorupdatesample] | Create or update a private endpoint connection x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/PrivateEndpointConnections_CreateOrUpdate.json                         |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                 | Delete a private endpoint connection x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/PrivateEndpointConnections_Delete.json                                           |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                       | Get a private endpoint connection x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/PrivateEndpointConnections_Get.json                                                 |
| [privateEndpointConnectionsListByAccountSample.ts][privateendpointconnectionslistbyaccountsample]   | Get private endpoint connections for account x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/PrivateEndpointConnections_ListByAccount.json                            |
| [privateLinkResourcesGetByGroupIdSample.ts][privatelinkresourcesgetbygroupidsample]                 | Gets a privately linkable resources for an account with given group identifier x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/PrivateLinkResources_GetByGroupId.json |
| [privateLinkResourcesListByAccountSample.ts][privatelinkresourceslistbyaccountsample]               | Gets a list of privately linkable resources for an account x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/PrivateLinkResources_ListByAccount.json                    |

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
node dist/accountsAddRootCollectionAdminSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/accountsAddRootCollectionAdminSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountsaddrootcollectionadminsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/typescript/src/accountsAddRootCollectionAdminSample.ts
[accountschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/typescript/src/accountsCheckNameAvailabilitySample.ts
[accountscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/typescript/src/accountsCreateOrUpdateSample.ts
[accountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/typescript/src/accountsDeleteSample.ts
[accountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/typescript/src/accountsGetSample.ts
[accountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/typescript/src/accountsListByResourceGroupSample.ts
[accountslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/typescript/src/accountsListBySubscriptionSample.ts
[accountslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/typescript/src/accountsListKeysSample.ts
[accountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/typescript/src/accountsUpdateSample.ts
[defaultaccountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/typescript/src/defaultAccountsGetSample.ts
[defaultaccountsremovesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/typescript/src/defaultAccountsRemoveSample.ts
[defaultaccountssetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/typescript/src/defaultAccountsSetSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/typescript/src/operationsListSample.ts
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/typescript/src/privateEndpointConnectionsCreateOrUpdateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/typescript/src/privateEndpointConnectionsListByAccountSample.ts
[privatelinkresourcesgetbygroupidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/typescript/src/privateLinkResourcesGetByGroupIdSample.ts
[privatelinkresourceslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/typescript/src/privateLinkResourcesListByAccountSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-purview?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/purview/arm-purview/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
